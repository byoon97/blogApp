export interface Posts {
     data : SinglePost[]
}

export interface SinglePost {
    id : number,
    attributes: {
        title : string,
        body: string,
        createdAt: string,
        coverPhoto: {
            data: {
                attributes: {
                    formats: {
                        large: {
                            url: string
                        }
                    }
                }
            }
        },
        users_permissions_user: {
            data: {
                attributes: {
                    username: string
                }
            }
        }
    }
}