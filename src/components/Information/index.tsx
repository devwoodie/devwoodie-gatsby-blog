import Image from '../Image';
import * as S from './styled';

const Information: React.FC = () => {
    return (
        <S.Wrapper>
            <S.TextSection>
                <div>
                    <b>디자인과 기술의 조화를 실현</b>하는
                </div>
                <div>
                    프론트엔드 개발자 <b>유동우</b> 입니다.
                </div>
            </S.TextSection>
        </S.Wrapper>
    );
};

export default Information;