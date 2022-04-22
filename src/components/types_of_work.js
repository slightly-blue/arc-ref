// Based on: https://www.mendeley.com/guides/harvard-citation-guide/

// This file holds all the configuration for how data should be displayed 
// for the different formats 


const TYPES_OF_WORK = {
  "Book": {
    required: [
      "title"
    ],
    shown: [
      "title",
      "author names",
      "year_of_publishing",
      "edition",
      "place_of_publication",
      "publisher"
    ],
    formatting: (props) => { return (
    <p>{props.author_surname_and_initials}. {props.year_of_publishing}. <i>{props.title}</i> {props.edition} {props.place_of_publication_and_publisher}, {props.numbers}
    [online] {props.publisher}. Available from: <a href={props.URL}>{props.URL}</a> Accessed {props.access_date}].</p>)},
  },
  "Edited Book": {
    required: [
      "title"
    ],
    shown: [
      "title",
      "eds",
      "authors",
      "year_of_publishing",
      "edition",
      "place_of_publication",
      "publisher"
    ]
  },
  "E-Book": {
    required: [
      "title"
    ],
    shown: [
      "title",
      "authors",
      "year_of_publishing",
      "edition",
      "name_of_ebook_collection", //If the e-book is accessed via an e-book reader "E-book format [e-book reader]" instead of "name of e-book collection [online]"
      "url_or_doi",
    ]
  },
  "Journal Article":{
    required: [
      "title"
    ],
    shown: [
      "authors",
      "year_of_publishing",
      "title",
      "journal",
      "volume_no",
      "issue_no",
      "season_no",
      "pages_used",
      "url"
    ],
    formatting: (citation, css) => { 
      // Author surname(s), initial(s). (Year) ‘Title of article’, Title of journal, volume(issue/season) 
      // [online]. Available at: URL or DOI (Accessed: day month year)

      // TODO: Handle cases for missing data 
      // OBS: formatting of individual items should be done on the backend so that users can make adjustments on the frontend

      return (
      <p style={css}>
        {citation.author_surname_and_initials}. {citation.year_of_publishing}. <i>{citation.title}</i> {citation.journal ?? citation.publisher} {citation.volume_no}{citation.volume_no && "("}{citation.issue_no}{citation.season_no && "/"}{citation.season_no}{citation.volume_no && "),"} 
        [online] {citation.publisher}. Available from: <a href={citation.url}>{citation.url}</a> Accessed {citation.access_date}].
      </p>
    )},
  },
  "Newspaper Article":{
    required: [
      "title",
      "publisher"
    ],
    shown: [
      "authors",
      "year_of_publishing",
      "title",
      "publisher",
      "edition",
      "day_month",
      "pages_used",
      "url"
    ]
  },
  "Photograph":{
    required: [
      "title"
    ],
    shown: [
      "authors",
      "year_of_publishing",
      "title",
      "url"
    ]
  },
  "Film":{
    required: [
      "title"
    ],
    shown: [
      "title",
      "year_of_publishing", // *year of distribution
      "director",
      "format",
      "place_of_distribution",
      "distribution_company"
    ]
  },
  "TV Programme":{
    required: [
      "title"
    ],
    shown: [
      "title_of_episode",
      "year_of_transmission",
      "title_of_tv_show",
      "series_#",
      "episode_#",
      "name_of_channel_or_streaming_service",
      "date_of_transmission"
    ]
  },
  "Music":{
    required: [
      "title"
    ],
    shown: [
    ]
  },
  "Website":{
    required: [
      "title"
    ],
    shown: [
      "authors",
      "year_of_publishing",
      "title",
      "url"
    ]
  },
  "Tweet":{
    required: [
      "title"
    ],
    shown: [
    ]
  },
  "Oral Source":{
    required: [
      "title"
    ],
    shown: [
    ]
  },
}
export {TYPES_OF_WORK};