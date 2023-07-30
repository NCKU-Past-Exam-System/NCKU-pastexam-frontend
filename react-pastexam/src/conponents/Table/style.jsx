import { ReactComponent as LoadingComponent } from '../Svg/loading.svg';
import { styled } from 'styled-components';
export const Loading = styled(LoadingComponent)`
  display: block;
  margin: 20px auto;
  width: 50px;
  fill: ${props => props.theme.colorPrimary};
`;     