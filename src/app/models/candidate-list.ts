import { CandidateCompany } from "./candidate-company"
import { CandidateProject } from "./candidate-project"

export interface CandidateList {
    firstName: string
    id: number
    lastName: number
    profilePath: string
    profilePicture: string 
    companies:CandidateCompany[] 
    projects:CandidateProject[]
}
