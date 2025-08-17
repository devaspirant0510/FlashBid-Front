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
                <Col lg={2} md={1} span={0}/>
                <Col lg={20} md={22} span={24}>
                    {children}
                </Col>
                <Col lg={2} md={1} span={0}/>
            </Row>
        </>
    )
}
export default MainLayout;