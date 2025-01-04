export interface CreateActivityRequest {
    name: string;
    start_time: string;
    end_time: string;
    date: string;
    userId: number;
    categoryId: number;
}

export interface UpdateActivityRequest {
    id: number;
    name?: string;
    start_time?: string;
    end_time?: string;
    date?: string;
}

export interface DeleteActivityRequest {
    id: number;
    name: string;
}

export interface ReadActivityResponse {
    name: string;
    start_time: string;
    end_time: string;
    date: string;
    user: {
        name: string; 
        email: string; 
    };
    category: {
        name: string;
    };
}

export interface ReadUserActivitiesResponse {
   name: string;
   start_time: string;
    end_time: string;
    date: string;
    category: {
        name: string;
    };
}


  