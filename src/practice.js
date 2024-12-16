// Response sample
const response = {
  "tracks": {
    "href": "https://api.spotify.com/v1/search?offset=0&limit=1&query=hello&type=track&locale=en-GB,en-US;q%3D0.9,en;q%3D0.8",
    "limit": 1,
    "next": "https://api.spotify.com/v1/search?offset=1&limit=1&query=hello&type=track&locale=en-GB,en-US;q%3D0.9,en;q%3D0.8",
    "offset": 0,
    "previous": null,
    "total": 100,
    "items": [
      {
        "album": {
          "album_type": "single",
          "total_tracks": 1,
          "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/3MJGcgbroIjiO90yi7RMhy"
          },
          "href": "https://api.spotify.com/v1/albums/3MJGcgbroIjiO90yi7RMhy",
          "id": "3MJGcgbroIjiO90yi7RMhy",
          "images": [
            {
              "url": "https://i.scdn.co/image/ab67616d0000b2738ad20aef4c717994ec4ede86",
              "height": 640,
              "width": 640
            },
            {
              "url": "https://i.scdn.co/image/ab67616d00001e028ad20aef4c717994ec4ede86",
              "height": 300,
              "width": 300
            },
            {
              "url": "https://i.scdn.co/image/ab67616d000048518ad20aef4c717994ec4ede86",
              "height": 64,
              "width": 64
            }
          ],
          "name": "Hello Miss Johnson",
          "release_date": "2024-11-21",
          "release_date_precision": "day",
          "type": "album",
          "uri": "spotify:album:3MJGcgbroIjiO90yi7RMhy",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/2LIk90788K0zvyj2JJVwkJ"
              },
              "href": "https://api.spotify.com/v1/artists/2LIk90788K0zvyj2JJVwkJ",
              "id": "2LIk90788K0zvyj2JJVwkJ",
              "name": "Jack Harlow",
              "type": "artist",
              "uri": "spotify:artist:2LIk90788K0zvyj2JJVwkJ"
            }
          ],
          "is_playable": true
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/2LIk90788K0zvyj2JJVwkJ"
            },
            "href": "https://api.spotify.com/v1/artists/2LIk90788K0zvyj2JJVwkJ",
            "id": "2LIk90788K0zvyj2JJVwkJ",
            "name": "Jack Harlow",
            "type": "artist",
            "uri": "spotify:artist:2LIk90788K0zvyj2JJVwkJ"
          }
        ],
        "available_markets": ["AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID", "JP", "TH", "VN", "RO", "IL", "ZA", "SA", "AE", "BH", "QA", "OM", "KW", "EG", "MA", "DZ", "TN", "LB", "JO", "PS", "IN", "KZ", "MD", "UA", "AL", "BA", "HR", "ME", "MK", "RS", "SI", "KR", "BD", "PK", "LK", "GH", "KE", "NG", "TZ", "UG", "AG", "AM", "BS", "BB", "BZ", "BT", "BW", "BF", "CV", "CW", "DM", "FJ", "GM", "GE", "GD", "GW", "GY", "HT", "JM", "KI", "LS", "LR", "MW", "MV", "ML", "MH", "FM", "NA", "NR", "NE", "PW", "PG", "PR", "WS", "SM", "ST", "SN", "SC", "SL", "SB", "KN", "LC", "VC", "SR", "TL", "TO", "TT", "TV", "VU", "AZ", "BN", "BI", "KH", "CM", "TD", "KM", "GQ", "SZ", "GA", "GN", "KG", "LA", "MO", "MR", "MN", "NP", "RW", "TG", "UZ", "ZW", "BJ", "MG", "MU", "MZ", "AO", "CI", "DJ", "ZM", "CD", "CG", "IQ", "LY", "TJ", "VE", "ET", "XK"],
        "disc_number": 1,
        "duration_ms": 164747,
        "explicit": true,
        "external_ids": {
          "isrc": "USAT22406895"
        },
        "external_urls": {
          "spotify": "https://open.spotify.com/track/6gH1UKDAhWS6qXzKXB4wuY"
        },
        "href": "https://api.spotify.com/v1/tracks/6gH1UKDAhWS6qXzKXB4wuY",
        "id": "6gH1UKDAhWS6qXzKXB4wuY",
        "is_playable": true,
        "name": "Hello Miss Johnson",
        "popularity": 76,
        "preview_url": null,
        "track_number": 1,
        "type": "track",
        "uri": "spotify:track:6gH1UKDAhWS6qXzKXB4wuY",
        "is_local": false
      }
    ]
  }
}