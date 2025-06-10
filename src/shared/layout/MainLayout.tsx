import {FC} from "react";
import {Header} from "@widgets/ui";
import {Row} from "@shared/ui";
import Col from "@shared/ui/grid/Column.tsx";

type Props = {
    children: React.ReactNode;
}
const MainLayout:FC<Props> = ({children}) => {
    return (
        <>
            <Header/>
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