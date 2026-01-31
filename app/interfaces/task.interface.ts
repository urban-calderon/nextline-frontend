export interface Task {
    id:          number;
    title:       string;
    description: string;
    status:      string;
    due_date:    string;
    comments:    string;
    tags:        string[];
    created_at:  string;
}