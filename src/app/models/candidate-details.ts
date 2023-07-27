import { CandidateCompany } from "./candidate-company"
import { CandidateProject } from "./candidate-project"

export class CandidateDetails {
    firstName: string | undefined
    id: number| undefined
    lastName: number| undefined
    dateOfBirth:string|undefined
    email:string|undefined
    description:string|undefined
    profilePath: string| undefined
    profilePicture: string | undefined
    companies:CandidateCompany[] =[]
    projects:CandidateProject[]=[]
}
