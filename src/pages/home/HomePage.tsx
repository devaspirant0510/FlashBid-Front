import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Button} from "@shared/components/ui/button.tsx";
import {Car} from "lucide-react";
import {Card} from "@shared/components/ui/card.tsx";
import {Link} from "react-router";
import {MainLayout} from "@shared/layout";
import AuthUser from "@/features/user/ui/AuthUser.tsx";

type TodoItem = {
    userId: number,
    id: number,
    title: string,
    completed: false
}
const HomePage = () => {
    const {isLoading, data, isError, error} = useQuery({
        queryKey: ['test-query',], queryFn: async () => {
            return (await axios.get<TodoItem[]>("https://jsonplaceholder.typicode.com/todos")).data as TodoItem[];
        }
    })
    if (isLoading) {
        return <>loading</>
    }
    if (isError) {
        return <>error</>
    }
    if (!data) {
        return <>nodata</>
    }
    return (
        <MainLayout>
            <AuthUser>

                <div className={'flex flex-col items-start m-2'}>
                    <Button asChild className={""}>
                        <Link to={"/auction-list"}> /auction-list 로 이동</Link>
                    </Button>
                    {data.map((item, index) => (
                        <Card className={'w-full p-4 my-2'} key={index}>
                            {item.title}
                        </Card>
                    ))}
                </div>
            </AuthUser>
        </MainLayout>
    )
}
export default HomePage;