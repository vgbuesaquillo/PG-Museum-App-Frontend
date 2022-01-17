
export const POST_USER = 'POST_USER';


export function postUser(dog) {
    return {
        type: POST_USER,
        payload: dog
    }
}

