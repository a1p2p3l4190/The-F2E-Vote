export interface ElectionData {
  date: string,
  session: string
  selected?: boolean,
  candidate: Candidate[]

}

export interface Candidate {
  president: string,
  vicePresident: string
  vote: number,
  party: string
  partyName: string
  point: string
}
