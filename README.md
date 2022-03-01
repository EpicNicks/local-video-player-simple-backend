## .movien format
This is a JSON file format with specific structure:

```
{
  title: string,
  genre: list of strings,
  path: string,
  type: string
}
```
## .seriesn format
This is a JSON file format with specific structure:

```
{
  title: string,
  genre: list of strings,
  type: string,
  seasons: [
    {
      title: string,
      episodes: [
        {
          path: string,
          title: string,
          episode: number
        }
      ]
    }
  ]
}
```