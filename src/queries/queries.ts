import { gql } from '@apollo/client';

export const FETCH_CHARACTERS = gql`
  query characters($page: Int!, $filter: String!) {
    characters(page: $page, filter: { name: $filter }) {
      info {
        pages
        count
        next
        prev
      }
      results {
        id
        name
        image
        location {
          name
        }
      }
    }
  }
`;
