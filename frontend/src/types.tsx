// Type denoting the types of output as a message or data
export type ArtistContent = {
    message?: string;
    data?: string [][];
}
  
  // Type denoying the inputs for the history as a command or output content
export type ArtistEntry = {
    command: string;
    output: ArtistContent;
};
  