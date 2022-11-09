export interface Post {
    id : string,
    attributes: {
        title: string,
        body: string,
        createdAt: string,
        coverPhoto: object,
        users_permissions_user: object
    }
    data: {
        id: string
        attributes: string
    }
}