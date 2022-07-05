import { useMutation, useQuery } from "@apollo/client";
import { v4 } from "uuid";

let token = v4();

function getToken() {
    if (token) return token
    else return v4()
}

export function useTokenWithQuery(query) {
    return useQuery(query, {
        context: {
            headers: {
                "token": getToken()
            }
        }
    })
}

export function useTokenWithMutation(query) {
    return useMutation(query, {
        context: {
            headers: {
                "token": getToken()
            }
        }
    })
}