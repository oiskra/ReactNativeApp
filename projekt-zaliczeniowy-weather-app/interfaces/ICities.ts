export interface ICities {
    error: boolean;
    msg: string;
    data: [
        {
            city: string;
            country: string;
            populationCounts: Array<
                {
                    year: string;
                    value: string;
                    sex: string;
                    rehability: string;
                }
            >
        }
    ]
}
