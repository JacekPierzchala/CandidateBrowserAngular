import { Company } from "./company";

export interface CandidateCompany {
    id:number,
    company:Company,
    dateStart:Date,
    dateEnd:Date,
    position:string
}
