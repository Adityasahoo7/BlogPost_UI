export interface AddBlogPostRequest {
  title: string;
  shortDescription: string;
  content: string;
  urlHandle: string;
  featuredImageURL: string;
  auther: string;
  isvisible: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  urlHandle: string;
  featuredImageURL: string;
  dateCreated: string;
  auther: string;
  isvisible: boolean;
}
export interface BlogpostV2{
  id: string;
  title: string;
  shortDescription: string;
    isvisible: boolean;
}