export interface AddBlogPostRequest {
  title: string;
  shortDescription: string;
  content: string;
  urlHandle: string;
  featuredImageURL: string;
  auther: string;
  isvisible: boolean;
}