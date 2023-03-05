import  sanityClient  from "@sanity/client";

export const client = sanityClient({
    projectId:'g7ujb9tm',
    dataset:'production',
    apiVersion:'2022-03-10',
    useCdn:false,
    token:import.meta.env.VITE_SANITY_TOKEN
})