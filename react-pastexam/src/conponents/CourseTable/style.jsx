import { ReactComponent as LoadingComponent } from '../Svg/loading.svg';
import { styled } from 'styled-components';
export const Loading = styled(LoadingComponent)`
  display: block;
  margin: 20px auto;
  width: 50px;
  fill: #fff;

`;     
export const ButtonStyle = {
    color: 'lightgray',
    fontSize: '1.3rem',
    width: '5%',
    margin: '0.5%',
    borderColor: 'rgba(228, 219, 233, 0.5)',
    borderWidth: '3px',
    borderRadius: '3px',
    ":hover": {
        borderColor: 'rgba(228, 219, 233, 0.25)',
        borderWidth: '3px',
    }
}
export const TableCellStyle = {
    fontSize: '1.3rem',
}