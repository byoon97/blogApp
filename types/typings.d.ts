export interface User {
    id : number;
    jwt: string
    username: string;
    email: string
}

export interface ID {
    id: string
}

export interface Posts {
     data : SinglePost[]
}

export interface SinglePost {
    data : {
        id : number,
        attributes: {
            title : string,
            body: string,
            createdAt: string,
            coverPhoto: {
                data: {
                    attributes: {
                        formats: {
                            small: {
                                url: string
                            }
                            large: {
                                url: string
                            }
                            thumbnail: {
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
            comments : {
                data : SingleComment[]
            }
        }
    },
    id : number,
    attributes: {
        title : string,
        body: string,
        createdAt: string,
        coverPhoto: {
            data: {
                attributes: {
                    formats: {
                        small: {
                            url: string
                        }
                        large: {
                            url: string
                        }
                        thumbnail: {
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
        comments : {
            data : SingleComment[]
        }
    }
}

export interface SingleComment {
        id : number,
        attributes: {
            body: string
            createdAt: string
            user: string
        }  
}