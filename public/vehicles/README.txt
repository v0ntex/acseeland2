VEHICLE PHOTOS
==============
Create one folder per car, named exactly like the vehicle's `id`
in src/data/vehicles.ts, then list the filenames in that car's `photos` array.

Example
  public/vehicles/porsche-911-992-carrera-4s/01.jpg
  public/vehicles/porsche-911-992-carrera-4s/02.jpg

  ...then in src/data/vehicles.ts:
  photos: ['01.jpg', '02.jpg']

The first photo in the array is the cover image used on cards.
Recommended: 3:2 landscape, at least 1600px wide, JPEG, under 500 KB each.
