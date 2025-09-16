import {useQuery} from "@tanstack/react-query";
import {httpFetcher} from "@/shared/lib/rqFetcher.ts";
import {ApiResult} from "@/entities/common";
import {FollowUser} from "@/entities/user/model";

export const useQueryGetFollowers = (userId: number) => {
    return useQuery({
        queryKey: ["api", "v1", "profile", userId, "followers"],
        queryFn: httpFetcher<ApiResult<FollowUser[]>>,
        enabled: !!userId,
    });
};