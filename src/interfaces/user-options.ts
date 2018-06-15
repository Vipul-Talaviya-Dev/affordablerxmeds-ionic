
export interface UserOptions {
  email: string,
  first_name: string,
  last_name: string,
  company: string,
  designation: string,
  phone_number: string,
  join_as: string
}

export let JoinAsOptions:any[] = [{ name: 'corporate',title:"Corporate" },
{ name: 'buy-side' ,title:"Buy-Side"},
{ name: 'sell-side',title:"Sell-Side" },
{ name: 'general investor',title:"General Investor" }
]


export interface LoginUserOptions {
  email: string,
  password: string
}
