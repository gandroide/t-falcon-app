import styled from "styled-components";

export const Panel = styled.div`
    display: flex;
    width: 50%;
    background-color: ${({theme}) => theme.palette.common.white};
    color: ${({theme}) => theme.palette.common.black};
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    @media screen and (min-width: 576px) {
        width: 50%;
    }
`

export const Container = styled.div`
    display: flex;
    width: 100%;
    color: white;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
`

export const Backdrop = styled.div`
    width: 100%;
    color: white;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    
`

export const CloseButton = styled.button`
    width: 4rem;
    height: 2rem;
`
