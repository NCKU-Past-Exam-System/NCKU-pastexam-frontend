import styled from 'styled-components';

export const SidebarContainer = styled.div`
    width: 10%;
    height: 100vh;
    background-color: #f5f5f5;
    position: relative;
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    border-right: 2px solid #e7e7e7;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
export const SidebarItem = styled.div`
    width: 10%;
    background-color: #f5f5f5;
    margin: 5px;
    left: 0;
    top: 0;
    display: flex;
`;
export const List = styled.div`
  text-align: left;
  cursor: pointer;
  padding-left: 30px;
  transition: .2s;
  font-size: 15px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;