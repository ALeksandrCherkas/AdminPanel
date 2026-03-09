import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../api/adminApi";
import type { User } from "../types/user";

export function useDeleteUser(){
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: (id: number) => adminApi.deleteUser(id),

        async onMutate(id) {
            await queryClient.cancelQueries({queryKey: ['users']});

            const previousUsers = queryClient.getQueryData<User[]>(['users']);

            queryClient.setQueryData<User[]>(['users'], (old) => 
                old ? old.filter(u => u.id !== id) : []
        );

            return { previousUsers };
        },
        onError(_err, _id, context) {
            if (context?.previousUsers) {
                queryClient.setQueryData(['users'], context.previousUsers);
            }
        },

        onSettled() {
            queryClient.invalidateQueries({queryKey: ['users']});
        },
    })
}