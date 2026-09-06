export const vehiclesQuery = /* groq */ `
  *[_type == "vehicle" && defined(slug.current)] | order(year desc, km asc) {
    "id": slug.current,
    make,
    model,
    variant,
    year,
    km,
    price,
    fuel,
    gearbox,
    power,
    drive,
    category,
    featured,
    mfk,
    colour,
    teaser,
    description,
    highlights,
    photos
  }
`;

export const soldQuery = /* groq */ `
  *[_type == "sold" && defined(slug.current)] | order(soldYear desc, ref asc) {
    "id": slug.current,
    ref,
    make,
    model,
    variant,
    year,
    soldYear,
    wide,
    colour,
    destination,
    note,
    photos
  }
`;
