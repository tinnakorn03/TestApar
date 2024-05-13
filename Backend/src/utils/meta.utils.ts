const meta = (summary: string, tags: string) => {
   return {
      swagger: {
         summary: summary,
         tags: [tags],
      },
   };
}
export default meta;
