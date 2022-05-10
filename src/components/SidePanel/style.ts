import styled from "styled-components";

export const Panel = styled.div`
    display: flex;
    width: 75%;
    background-color: white;
    color: black;
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