export interface GvlksEdition {
  id: string
  license: string
}

export interface ActivateFormData {
  edition: string
  arch: string
  host: string
  license: string
}

export interface GvlksData {
  version: string
  editions: GvlksEdition[]
}
