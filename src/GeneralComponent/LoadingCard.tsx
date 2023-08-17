import { useThemeStore } from "../Zustand";
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
    0% {
        background-position: -300px 0;
    }
    100% {
        background-position: 300px 0;
    }
`;

const placeHolderShimmer = keyframes`
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
`;
const Inter_draw = styled.section`
    width: 100%;
    height: 100px;
    position: absolute;
    top: 100px;
    `;
    const Linearbackground = styled.section`
        animation: ${placeHolderShimmer} 1.5s infinite linear;
        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        background-size: 1000px 104px;
        height: 200px;
        position: relative;
        overflow: hidden;
    `;

    const Card = styled.section`
        width: 100%;
        padding: 10px;
        border-radius: 3px;
    `;

    const Card__skeleton = styled.section`
        background-image: linear-gradient(
            90deg,
            #ccc 0px,
            rgb(229 229 229 / 90%) 40px,
            #ccc 80px
        );
        background-size: 300%;
        background-position: 100% 0;
        border-radius: inherit;
        position: relative;
        animation: ${shimmer} 1.5s infinite linear;
    `;

    const Card_title = styled.section`
        height: 15px;
        margin-bottom: 15px;
    `;

    const Inter_crop = styled.section`
        width: 20px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 100px;
    `;

    const Inter_right_top = styled.section`
    width: 100%;
    height: 20px;
    position: absolute;
    top: 20px;
    left: 100px;
    `;

    const Inter_right_bottom = styled.section`
    width: 100%;
    height: 50px;
    position: absolute;
    top: 60px;
    left: 100px;
    `;



export function SmallCard() {
    const theme = useThemeStore((state: any) => state.theme);
    return (
        <Card className={` ${theme ? "bg-[#000]" : "bg-[#fff]"}`}>
            <Linearbackground className={`${theme ? "bg-[black]" : "bg-[#f6f7f8]"}`}>
                <Inter_draw
                    className={`${theme ? "bg-[#000]" : "bg-[#fff]"}`}
                ></Inter_draw>
                <Inter_crop
                    className={`${theme ? "bg-[#000]" : "bg-[#fff]"}`}
                ></Inter_crop>
                <Inter_right_top
                    className={`${theme ? "bg-[#000]" : "bg-[#fff]"}`}
                ></Inter_right_top>
                <Inter_right_bottom
                    className={`${theme ? "bg-[#000]" : "bg-[#fff]"} `}
                ></Inter_right_bottom>
            </Linearbackground>
            <Card__skeleton>
                <Card_title>
                </Card_title>
            </Card__skeleton>
            <Card__skeleton>
                <Card_title></Card_title>
            </Card__skeleton>
            <Card__skeleton>
                <Card_title></Card_title>
            </Card__skeleton>
        </Card>
    );
}


export function LongCard() {
    const theme = useThemeStore((state: any) => state.theme);
    return (
        <Card className={` ${theme ? "bg-[#000]" : "bg-[#fff]"}`}>
            <Linearbackground className={`${theme ? "bg-[black]" : "bg-[#f6f7f8]"}`}>
                <Inter_draw
                    className={`${theme ? "bg-[#000]" : "bg-[#fff]"}`}
                ></Inter_draw>
                <Inter_crop
                    className={`${theme ? "bg-[#000]" : "bg-[#fff]"}`}
                ></Inter_crop>
                <Inter_right_top
                    className={`${theme ? "bg-[#000]" : "bg-[#fff]"}`}
                ></Inter_right_top>
                <Inter_right_bottom
                    className={`${theme ? "bg-[#000]" : "bg-[#fff]"} `}
                ></Inter_right_bottom>
            </Linearbackground>
            <Card__skeleton>
                <Card_title>
                </Card_title>
            </Card__skeleton>
            <Card__skeleton>
                <Card_title></Card_title>
            </Card__skeleton>
            <Card__skeleton>
                <Card_title></Card_title>
            </Card__skeleton>
            <Card__skeleton>
                <Card_title></Card_title>
            </Card__skeleton>
            <Card__skeleton>
                <Card_title></Card_title>
            </Card__skeleton>
            <Card__skeleton>
                <Card_title></Card_title>
            </Card__skeleton>
            <Card__skeleton>
                <Card_title></Card_title>
            </Card__skeleton>
            <Card__skeleton>
                <Card_title></Card_title>
            </Card__skeleton>
            <Card__skeleton>
                <Card_title></Card_title>
            </Card__skeleton>
        </Card>
    );
}
