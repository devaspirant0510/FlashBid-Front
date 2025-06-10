import {FC, ReactNode} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@shared/lib";

type Props = {
    children: ReactNode;
}

const RQProvider: FC<Props> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default RQProvider;