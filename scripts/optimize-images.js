#!/usr/bin/env node
/**
 * 이미지 최적화 스크립트
 *
 * content/, assets/ 폴더의 PNG/JPEG 이미지를 리사이즈·압축한다.
 * gatsby-plugin-sharp가 빌드 시 읽어들이는 원본 크기를 미리 줄여
 * 빌드 시간과 저장소 용량을 함께 절감하는 것이 목적이다.
 *
 * 사용법
 *   node scripts/optimize-images.js                # content/, assets/ 전체 스캔
 *   node scripts/optimize-images.js a.png b.jpg    # 지정한 파일만 처리 (lint-staged 연동)
 *
 * 멱등성: 결과가 원본보다 충분히 작을 때만(SAVINGS_THRESHOLD) 덮어쓴다.
 * 따라서 재실행해도 이미 최적화된 이미지는 스킵되어 품질이 계속 열화되지 않는다.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAX_WIDTH = 1440;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
// 결과가 원본의 이 비율 미만일 때만 교체.
// 값을 낮게(=절감폭 크게) 잡아, 이미 최적화된 이미지의 재인코딩(세대 손실)을
// 막고 한 번의 실행으로 수렴하도록 한다. 최초 최적화는 절감폭이 크므로 문제 없다.
const SAVINGS_THRESHOLD = 0.85;
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);
const DEFAULT_DIRS = ['content', 'assets'];
const ROOT = path.resolve(__dirname, '..');

const isImage = (filePath) => IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase());

const formatKb = (bytes) => `${(bytes / 1024).toFixed(1)}KB`;

/**
 * 디렉토리를 재귀적으로 스캔해 이미지 파일 경로 목록을 반환한다. (뮤테이션 없이 누적)
 */
function collectImages(dir) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    console.error(`디렉토리를 읽을 수 없습니다: ${dir}`, error.message);
    return [];
  }

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectImages(fullPath);
    if (entry.isFile() && isImage(fullPath)) return [fullPath];
    return [];
  });
}

/**
 * sharp 파이프라인을 적용해 최적화된 버퍼를 만든다. 원본은 건드리지 않는다.
 */
async function toOptimizedBuffer(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  // .rotate() : EXIF orientation 값을 실제 픽셀에 반영(auto-orient)한다.
  // 폰 사진처럼 회전 플래그가 있는 이미지도 메타데이터를 버린 뒤 눕지 않는다.
  // 반드시 resize 앞에 둬야 한다.
  const pipeline = sharp(filePath).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === '.png') {
    return pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toBuffer();
  }
  return pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
}

/**
 * 파일 하나를 처리한다. 절감 효과가 있을 때만 덮어쓰고 결과를 반환한다.
 */
async function optimizeFile(filePath) {
  try {
    const originalSize = fs.statSync(filePath).size;
    const optimized = await toOptimizedBuffer(filePath);

    if (optimized.length >= originalSize * SAVINGS_THRESHOLD) {
      return { filePath, skipped: true, originalSize, newSize: originalSize };
    }

    fs.writeFileSync(filePath, optimized);
    return { filePath, skipped: false, originalSize, newSize: optimized.length };
  } catch (error) {
    console.error(`처리 실패: ${filePath}`, error.message);
    return { filePath, error: true, originalSize: 0, newSize: 0 };
  }
}

function resolveTargets(args) {
  if (args.length > 0) {
    return args.map((arg) => path.resolve(arg)).filter(isImage);
  }
  return DEFAULT_DIRS.flatMap((dir) => collectImages(path.join(ROOT, dir)));
}

async function main() {
  const targets = resolveTargets(process.argv.slice(2));

  if (targets.length === 0) {
    console.log('처리할 이미지가 없습니다.');
    return;
  }

  console.log(`이미지 ${targets.length}개 최적화 시작...\n`);

  const results = [];
  for (const filePath of targets) {
    // 파일별 순차 처리 — 메모리 급증 방지
    const result = await optimizeFile(filePath);
    results.push(result);

    if (result.error) continue;
    const relative = path.relative(ROOT, filePath);
    if (result.skipped) {
      console.log(`  skip  ${relative} (${formatKb(result.originalSize)})`);
    } else {
      console.log(`  ok    ${relative}  ${formatKb(result.originalSize)} → ${formatKb(result.newSize)}`);
    }
  }

  const optimized = results.filter((r) => !r.skipped && !r.error);
  const savedBytes = optimized.reduce((sum, r) => sum + (r.originalSize - r.newSize), 0);

  console.log(
    `\n완료: ${optimized.length}개 최적화, ${results.filter((r) => r.skipped).length}개 스킵, ` +
      `총 ${formatKb(savedBytes)} 절감`,
  );
}

main().catch((error) => {
  console.error('스크립트 실행 실패:', error);
  process.exit(1);
});
