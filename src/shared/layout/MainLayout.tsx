import React, {FC} from "react";
import {Header} from "@widgets/ui";
import {Row} from "@shared/ui";
import Col from "@shared/ui/grid/Column.tsx";

type Props = {
    children: React.ReactNode;
    isBanner?: boolean
}
const MainLayout: FC<Props> = ({children, isBanner}) => {
    return (
        <>
            <div className="relative">
                {/* 배너 */}
                {/* 헤더 */}
                <div className="relative z-20">
                    <Header/>
                </div>
                {isBanner && (
                    <>
                        <img
                            className="relative w-full -mt-32 z-0"  // 헤더 위로 배너를 올려!
                            src="/img/banner.png"
                            alt="banner logo"
                        />
                    </>
                )}

            </div>
            <Row>
                <Col span={2}/>
                <Col span={20}>
                    {children}
                </Col>
                <Col span={2}/>
            </Row>
        </>
    )
}
export default MainLayout;