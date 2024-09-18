export interface OptionQuestion{
    id?: number;
    label?: string;
    isCorrect?: boolean;
    isOnlyOption?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface SelectedOptions{
    id?: number;
    selected?: boolean;
    option?: OptionQuestion;
}


export interface Response{
    id?: number;
    textAnswer?: string;
    dateAnswer?: string;
    numberAnswer?: number;
    createdAt?: string;
    isActive?: true,
    selectedOptions?: SelectedOptions[];
}

export interface Question {
    id?: number;
    text?: string;
    type?: string;
    required?: boolean;
    createdAt?: string;
    updatedAt?: string;
    options?: OptionQuestion[];
    responses?: Response[];
}




export interface Survey {
    id?: number;
    name?: string;
    description?: string;
    token?: string;
    createdAt?: string;
    updatedAt?: string;
    questions?: Question[];
    createdBy?: {
        id?: number;
        email?: string;
        createdAt?: string;
        updatedAt?: string;
    }
}