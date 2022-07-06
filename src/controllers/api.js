import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { v4 } from "uuid";

const UPPER_MEETING_LIMIT = 100000;
let token = 'a123gjhgjsdf6577';

function getToken() {
    if (token) return token
    else return 'a123gjhgjsdf6577'
}

export function getRandomNumber() {
    return Math.floor((Math.random() * UPPER_MEETING_LIMIT) + 1);
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

export function useLazyTokenWithQuery(query) {
    return useLazyQuery(query, {
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