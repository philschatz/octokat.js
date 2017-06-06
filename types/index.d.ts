

declare module 'octokat' {

  export interface Callback<T> {
    (error: Error | null, result: T): void
  }

  // Base types
  export interface ParamFiles { files: Object }
export interface ParamBranch { branch: String }
export interface ParamClientId { client_id?: String }
export interface ParamSha { sha: String }
export interface ParamDescription { description?: String }
export interface ParamId { id: String }
export interface ParamRef { ref: String }
export interface ParamNumber { number: Number }
export interface ParamName { name: String }
export interface ParamDirection { direction?: "asc"|"desc" }
export interface ParamSince { since?: String }
export interface ParamUntil { until?: String }
export interface ParamState { state?: "open"|"closed"|"all" }
export interface ParamColor { color: String }
export interface ParamBase { base: String }
export interface ParamHead { head: String }
export interface ParamPath { path: String }
export interface ParamPosition { position: Number }
export interface ParamBody { body: String }
export interface ParamHomepage { homepage?: String }
export interface ParamPrivate { private?: Boolean }
export interface ParamHasIssues { has_issues?: Boolean }
export interface ParamHasWiki { has_wiki?: Boolean }
export interface ParamHasDownloads { has_downloads?: Boolean }
export interface ParamDefaultBranch { default_branch?: String }
export interface ParamTitle { title: String }
export interface ParamKey { key: String }
export interface ParamPage { page?: Number }
export interface ParamPerPage { per_page?: Number }
export interface ParamScopes { scopes?: string[] }
export interface ParamNote { note?: String }
export interface ParamNoteUrl { note_url?: String }
export interface ParamAutoInit { auto_init?: Boolean }
export interface ParamGitignoreTemplate { gitignore_template?: String }
export interface ParamLicenseTemplate { license_template?: String }
export interface ParamOrder { order?: "asc"|"desc" }
export interface ParamQ { q: String }
export interface ParamData { data: String }
export interface ParamPrivacy { privacy?: "secret"|"closed" }
export interface ParamFingerprint { fingerprint?: String }
export interface ParamAccessToken { access_token: String }
export interface ParamAssignees { assignees?: string[] }

  // Response Types
  export type CommitDiff = {
  readonly url: string
  readonly html_url: string
  readonly permalink_url: string
  readonly diff_url: string
  readonly patch_url: string
  readonly base_commit: RepoCommitMaybe
  readonly merge_base_commit: RepoCommitMaybe
  readonly status: string
  readonly ahead_by: number
  readonly behind_by: number
  readonly total_commits: number
  readonly commits: any[]
  readonly files: any[]
}

export type CommitSlugMaybe = {
  readonly name: string
  readonly path: string
  readonly sha: string
  readonly size: number
  readonly url: string
  readonly html_url: string
  readonly git_url: string
  readonly download_url: string
  readonly type: string
  readonly '_links': { readonly self: string
  readonly git: string
  readonly html: string }
}

export type Download = {
  readonly url: string
  readonly id: number
  readonly html_url: string
  readonly name: string
  readonly description: string
  readonly created_at: string
  readonly size: number
  readonly download_count: number
  readonly content_type: string
}

export type Emojis = {
  readonly '100': string
  readonly '1234': string
  readonly '+1': string
  readonly '-1': string
  readonly '1st_place_medal': string
  readonly '2nd_place_medal': string
  readonly '3rd_place_medal': string
  readonly '8ball': string
  readonly a: string
  readonly ab: string
  readonly abc: string
  readonly abcd: string
  readonly accept: string
  readonly aerial_tramway: string
  readonly afghanistan: string
  readonly airplane: string
  readonly aland_islands: string
  readonly alarm_clock: string
  readonly albania: string
  readonly alembic: string
  readonly algeria: string
  readonly alien: string
  readonly ambulance: string
  readonly american_samoa: string
  readonly amphora: string
  readonly anchor: string
  readonly andorra: string
  readonly angel: string
  readonly anger: string
  readonly angola: string
  readonly angry: string
  readonly anguilla: string
  readonly anguished: string
  readonly ant: string
  readonly antarctica: string
  readonly antigua_barbuda: string
  readonly apple: string
  readonly aquarius: string
  readonly argentina: string
  readonly aries: string
  readonly armenia: string
  readonly arrow_backward: string
  readonly arrow_double_down: string
  readonly arrow_double_up: string
  readonly arrow_down: string
  readonly arrow_down_small: string
  readonly arrow_forward: string
  readonly arrow_heading_down: string
  readonly arrow_heading_up: string
  readonly arrow_left: string
  readonly arrow_lower_left: string
  readonly arrow_lower_right: string
  readonly arrow_right: string
  readonly arrow_right_hook: string
  readonly arrow_up: string
  readonly arrow_up_down: string
  readonly arrow_up_small: string
  readonly arrow_upper_left: string
  readonly arrow_upper_right: string
  readonly arrows_clockwise: string
  readonly arrows_counterclockwise: string
  readonly art: string
  readonly articulated_lorry: string
  readonly artificial_satellite: string
  readonly aruba: string
  readonly asterisk: string
  readonly astonished: string
  readonly athletic_shoe: string
  readonly atm: string
  readonly atom: string
  readonly atom_symbol: string
  readonly australia: string
  readonly austria: string
  readonly avocado: string
  readonly azerbaijan: string
  readonly b: string
  readonly baby: string
  readonly baby_bottle: string
  readonly baby_chick: string
  readonly baby_symbol: string
  readonly back: string
  readonly bacon: string
  readonly badminton: string
  readonly baggage_claim: string
  readonly baguette_bread: string
  readonly bahamas: string
  readonly bahrain: string
  readonly balance_scale: string
  readonly balloon: string
  readonly ballot_box: string
  readonly ballot_box_with_check: string
  readonly bamboo: string
  readonly banana: string
  readonly bangbang: string
  readonly bangladesh: string
  readonly bank: string
  readonly bar_chart: string
  readonly barbados: string
  readonly barber: string
  readonly baseball: string
  readonly basecamp: string
  readonly basecampy: string
  readonly basketball: string
  readonly basketball_man: string
  readonly basketball_woman: string
  readonly bat: string
  readonly bath: string
  readonly bathtub: string
  readonly battery: string
  readonly beach_umbrella: string
  readonly bear: string
  readonly bed: string
  readonly bee: string
  readonly beer: string
  readonly beers: string
  readonly beetle: string
  readonly beginner: string
  readonly belarus: string
  readonly belgium: string
  readonly belize: string
  readonly bell: string
  readonly bellhop_bell: string
  readonly benin: string
  readonly bento: string
  readonly bermuda: string
  readonly bhutan: string
  readonly bicyclist: string
  readonly bike: string
  readonly biking_man: string
  readonly biking_woman: string
  readonly bikini: string
  readonly biohazard: string
  readonly bird: string
  readonly birthday: string
  readonly black_circle: string
  readonly black_flag: string
  readonly black_heart: string
  readonly black_joker: string
  readonly black_large_square: string
  readonly black_medium_small_square: string
  readonly black_medium_square: string
  readonly black_nib: string
  readonly black_small_square: string
  readonly black_square_button: string
  readonly blonde_man: string
  readonly blonde_woman: string
  readonly blossom: string
  readonly blowfish: string
  readonly blue_book: string
  readonly blue_car: string
  readonly blue_heart: string
  readonly blush: string
  readonly boar: string
  readonly boat: string
  readonly bolivia: string
  readonly bomb: string
  readonly book: string
  readonly bookmark: string
  readonly bookmark_tabs: string
  readonly books: string
  readonly boom: string
  readonly boot: string
  readonly bosnia_herzegovina: string
  readonly botswana: string
  readonly bouquet: string
  readonly bow: string
  readonly bow_and_arrow: string
  readonly bowing_man: string
  readonly bowing_woman: string
  readonly bowling: string
  readonly bowtie: string
  readonly boxing_glove: string
  readonly boy: string
  readonly brazil: string
  readonly bread: string
  readonly bride_with_veil: string
  readonly bridge_at_night: string
  readonly briefcase: string
  readonly british_indian_ocean_territory: string
  readonly british_virgin_islands: string
  readonly broken_heart: string
  readonly brunei: string
  readonly bug: string
  readonly building_construction: string
  readonly bulb: string
  readonly bulgaria: string
  readonly bullettrain_front: string
  readonly bullettrain_side: string
  readonly burkina_faso: string
  readonly burrito: string
  readonly burundi: string
  readonly bus: string
  readonly business_suit_levitating: string
  readonly busstop: string
  readonly bust_in_silhouette: string
  readonly busts_in_silhouette: string
  readonly butterfly: string
  readonly cactus: string
  readonly cake: string
  readonly calendar: string
  readonly call_me_hand: string
  readonly calling: string
  readonly cambodia: string
  readonly camel: string
  readonly camera: string
  readonly camera_flash: string
  readonly cameroon: string
  readonly camping: string
  readonly canada: string
  readonly canary_islands: string
  readonly cancer: string
  readonly candle: string
  readonly candy: string
  readonly canoe: string
  readonly cape_verde: string
  readonly capital_abcd: string
  readonly capricorn: string
  readonly car: string
  readonly card_file_box: string
  readonly card_index: string
  readonly card_index_dividers: string
  readonly caribbean_netherlands: string
  readonly carousel_horse: string
  readonly carrot: string
  readonly cat: string
  readonly cat2: string
  readonly cayman_islands: string
  readonly cd: string
  readonly central_african_republic: string
  readonly chad: string
  readonly chains: string
  readonly champagne: string
  readonly chart: string
  readonly chart_with_downwards_trend: string
  readonly chart_with_upwards_trend: string
  readonly checkered_flag: string
  readonly cheese: string
  readonly cherries: string
  readonly cherry_blossom: string
  readonly chestnut: string
  readonly chicken: string
  readonly children_crossing: string
  readonly chile: string
  readonly chipmunk: string
  readonly chocolate_bar: string
  readonly christmas_island: string
  readonly christmas_tree: string
  readonly church: string
  readonly cinema: string
  readonly circus_tent: string
  readonly city_sunrise: string
  readonly city_sunset: string
  readonly cityscape: string
  readonly cl: string
  readonly clamp: string
  readonly clap: string
  readonly clapper: string
  readonly classical_building: string
  readonly clinking_glasses: string
  readonly clipboard: string
  readonly clock1: string
  readonly clock10: string
  readonly clock1030: string
  readonly clock11: string
  readonly clock1130: string
  readonly clock12: string
  readonly clock1230: string
  readonly clock130: string
  readonly clock2: string
  readonly clock230: string
  readonly clock3: string
  readonly clock330: string
  readonly clock4: string
  readonly clock430: string
  readonly clock5: string
  readonly clock530: string
  readonly clock6: string
  readonly clock630: string
  readonly clock7: string
  readonly clock730: string
  readonly clock8: string
  readonly clock830: string
  readonly clock9: string
  readonly clock930: string
  readonly closed_book: string
  readonly closed_lock_with_key: string
  readonly closed_umbrella: string
  readonly cloud: string
  readonly cloud_with_lightning: string
  readonly cloud_with_lightning_and_rain: string
  readonly cloud_with_rain: string
  readonly cloud_with_snow: string
  readonly clown_face: string
  readonly clubs: string
  readonly cn: string
  readonly cocktail: string
  readonly cocos_islands: string
  readonly coffee: string
  readonly coffin: string
  readonly cold_sweat: string
  readonly collision: string
  readonly colombia: string
  readonly comet: string
  readonly comoros: string
  readonly computer: string
  readonly computer_mouse: string
  readonly confetti_ball: string
  readonly confounded: string
  readonly confused: string
  readonly congo_brazzaville: string
  readonly congo_kinshasa: string
  readonly congratulations: string
  readonly construction: string
  readonly construction_worker: string
  readonly construction_worker_man: string
  readonly construction_worker_woman: string
  readonly control_knobs: string
  readonly convenience_store: string
  readonly cook_islands: string
  readonly cookie: string
  readonly cool: string
  readonly cop: string
  readonly copyright: string
  readonly corn: string
  readonly costa_rica: string
  readonly cote_divoire: string
  readonly couch_and_lamp: string
  readonly couple: string
  readonly couple_with_heart: string
  readonly couple_with_heart_man_man: string
  readonly couple_with_heart_woman_man: string
  readonly couple_with_heart_woman_woman: string
  readonly couplekiss_man_man: string
  readonly couplekiss_man_woman: string
  readonly couplekiss_woman_woman: string
  readonly cow: string
  readonly cow2: string
  readonly cowboy_hat_face: string
  readonly crab: string
  readonly crayon: string
  readonly credit_card: string
  readonly crescent_moon: string
  readonly cricket: string
  readonly croatia: string
  readonly crocodile: string
  readonly croissant: string
  readonly crossed_fingers: string
  readonly crossed_flags: string
  readonly crossed_swords: string
  readonly crown: string
  readonly cry: string
  readonly crying_cat_face: string
  readonly crystal_ball: string
  readonly cuba: string
  readonly cucumber: string
  readonly cupid: string
  readonly curacao: string
  readonly curly_loop: string
  readonly currency_exchange: string
  readonly curry: string
  readonly custard: string
  readonly customs: string
  readonly cyclone: string
  readonly cyprus: string
  readonly czech_republic: string
  readonly dagger: string
  readonly dancer: string
  readonly dancers: string
  readonly dancing_men: string
  readonly dancing_women: string
  readonly dango: string
  readonly dark_sunglasses: string
  readonly dart: string
  readonly dash: string
  readonly date: string
  readonly de: string
  readonly deciduous_tree: string
  readonly deer: string
  readonly denmark: string
  readonly department_store: string
  readonly derelict_house: string
  readonly desert: string
  readonly desert_island: string
  readonly desktop_computer: string
  readonly detective: string
  readonly diamond_shape_with_a_dot_inside: string
  readonly diamonds: string
  readonly disappointed: string
  readonly disappointed_relieved: string
  readonly dizzy: string
  readonly dizzy_face: string
  readonly djibouti: string
  readonly do_not_litter: string
  readonly dog: string
  readonly dog2: string
  readonly dollar: string
  readonly dolls: string
  readonly dolphin: string
  readonly dominica: string
  readonly dominican_republic: string
  readonly door: string
  readonly doughnut: string
  readonly dove: string
  readonly dragon: string
  readonly dragon_face: string
  readonly dress: string
  readonly dromedary_camel: string
  readonly drooling_face: string
  readonly droplet: string
  readonly drum: string
  readonly duck: string
  readonly dvd: string
  readonly 'e-mail': string
  readonly eagle: string
  readonly ear: string
  readonly ear_of_rice: string
  readonly earth_africa: string
  readonly earth_americas: string
  readonly earth_asia: string
  readonly ecuador: string
  readonly egg: string
  readonly eggplant: string
  readonly egypt: string
  readonly eight: string
  readonly eight_pointed_black_star: string
  readonly eight_spoked_asterisk: string
  readonly el_salvador: string
  readonly electric_plug: string
  readonly electron: string
  readonly elephant: string
  readonly email: string
  readonly end: string
  readonly envelope: string
  readonly envelope_with_arrow: string
  readonly equatorial_guinea: string
  readonly eritrea: string
  readonly es: string
  readonly estonia: string
  readonly ethiopia: string
  readonly eu: string
  readonly euro: string
  readonly european_castle: string
  readonly european_post_office: string
  readonly european_union: string
  readonly evergreen_tree: string
  readonly exclamation: string
  readonly expressionless: string
  readonly eye: string
  readonly eye_speech_bubble: string
  readonly eyeglasses: string
  readonly eyes: string
  readonly face_with_head_bandage: string
  readonly face_with_thermometer: string
  readonly facepunch: string
  readonly factory: string
  readonly falkland_islands: string
  readonly fallen_leaf: string
  readonly family: string
  readonly family_man_boy: string
  readonly family_man_boy_boy: string
  readonly family_man_girl: string
  readonly family_man_girl_boy: string
  readonly family_man_girl_girl: string
  readonly family_man_man_boy: string
  readonly family_man_man_boy_boy: string
  readonly family_man_man_girl: string
  readonly family_man_man_girl_boy: string
  readonly family_man_man_girl_girl: string
  readonly family_man_woman_boy: string
  readonly family_man_woman_boy_boy: string
  readonly family_man_woman_girl: string
  readonly family_man_woman_girl_boy: string
  readonly family_man_woman_girl_girl: string
  readonly family_woman_boy: string
  readonly family_woman_boy_boy: string
  readonly family_woman_girl: string
  readonly family_woman_girl_boy: string
  readonly family_woman_girl_girl: string
  readonly family_woman_woman_boy: string
  readonly family_woman_woman_boy_boy: string
  readonly family_woman_woman_girl: string
  readonly family_woman_woman_girl_boy: string
  readonly family_woman_woman_girl_girl: string
  readonly faroe_islands: string
  readonly fast_forward: string
  readonly fax: string
  readonly fearful: string
  readonly feelsgood: string
  readonly feet: string
  readonly female_detective: string
  readonly ferris_wheel: string
  readonly ferry: string
  readonly field_hockey: string
  readonly fiji: string
  readonly file_cabinet: string
  readonly file_folder: string
  readonly film_projector: string
  readonly film_strip: string
  readonly finland: string
  readonly finnadie: string
  readonly fire: string
  readonly fire_engine: string
  readonly fireworks: string
  readonly first_quarter_moon: string
  readonly first_quarter_moon_with_face: string
  readonly fish: string
  readonly fish_cake: string
  readonly fishing_pole_and_fish: string
  readonly fist: string
  readonly fist_left: string
  readonly fist_oncoming: string
  readonly fist_raised: string
  readonly fist_right: string
  readonly five: string
  readonly flags: string
  readonly flashlight: string
  readonly fleur_de_lis: string
  readonly flight_arrival: string
  readonly flight_departure: string
  readonly flipper: string
  readonly floppy_disk: string
  readonly flower_playing_cards: string
  readonly flushed: string
  readonly fog: string
  readonly foggy: string
  readonly football: string
  readonly footprints: string
  readonly fork_and_knife: string
  readonly fountain: string
  readonly fountain_pen: string
  readonly four: string
  readonly four_leaf_clover: string
  readonly fox_face: string
  readonly fr: string
  readonly framed_picture: string
  readonly free: string
  readonly french_guiana: string
  readonly french_polynesia: string
  readonly french_southern_territories: string
  readonly fried_egg: string
  readonly fried_shrimp: string
  readonly fries: string
  readonly frog: string
  readonly frowning: string
  readonly frowning_face: string
  readonly frowning_man: string
  readonly frowning_woman: string
  readonly fu: string
  readonly fuelpump: string
  readonly full_moon: string
  readonly full_moon_with_face: string
  readonly funeral_urn: string
  readonly gabon: string
  readonly gambia: string
  readonly game_die: string
  readonly gb: string
  readonly gear: string
  readonly gem: string
  readonly gemini: string
  readonly georgia: string
  readonly ghana: string
  readonly ghost: string
  readonly gibraltar: string
  readonly gift: string
  readonly gift_heart: string
  readonly girl: string
  readonly globe_with_meridians: string
  readonly goal_net: string
  readonly goat: string
  readonly goberserk: string
  readonly godmode: string
  readonly golf: string
  readonly golfing_man: string
  readonly golfing_woman: string
  readonly gorilla: string
  readonly grapes: string
  readonly greece: string
  readonly green_apple: string
  readonly green_book: string
  readonly green_heart: string
  readonly green_salad: string
  readonly greenland: string
  readonly grenada: string
  readonly grey_exclamation: string
  readonly grey_question: string
  readonly grimacing: string
  readonly grin: string
  readonly grinning: string
  readonly guadeloupe: string
  readonly guam: string
  readonly guardsman: string
  readonly guardswoman: string
  readonly guatemala: string
  readonly guernsey: string
  readonly guinea: string
  readonly guinea_bissau: string
  readonly guitar: string
  readonly gun: string
  readonly guyana: string
  readonly haircut: string
  readonly haircut_man: string
  readonly haircut_woman: string
  readonly haiti: string
  readonly hamburger: string
  readonly hammer: string
  readonly hammer_and_pick: string
  readonly hammer_and_wrench: string
  readonly hamster: string
  readonly hand: string
  readonly handbag: string
  readonly handshake: string
  readonly hankey: string
  readonly hash: string
  readonly hatched_chick: string
  readonly hatching_chick: string
  readonly headphones: string
  readonly hear_no_evil: string
  readonly heart: string
  readonly heart_decoration: string
  readonly heart_eyes: string
  readonly heart_eyes_cat: string
  readonly heartbeat: string
  readonly heartpulse: string
  readonly hearts: string
  readonly heavy_check_mark: string
  readonly heavy_division_sign: string
  readonly heavy_dollar_sign: string
  readonly heavy_exclamation_mark: string
  readonly heavy_heart_exclamation: string
  readonly heavy_minus_sign: string
  readonly heavy_multiplication_x: string
  readonly heavy_plus_sign: string
  readonly helicopter: string
  readonly herb: string
  readonly hibiscus: string
  readonly high_brightness: string
  readonly high_heel: string
  readonly hocho: string
  readonly hole: string
  readonly honduras: string
  readonly honey_pot: string
  readonly honeybee: string
  readonly hong_kong: string
  readonly horse: string
  readonly horse_racing: string
  readonly hospital: string
  readonly hot_pepper: string
  readonly hotdog: string
  readonly hotel: string
  readonly hotsprings: string
  readonly hourglass: string
  readonly hourglass_flowing_sand: string
  readonly house: string
  readonly house_with_garden: string
  readonly houses: string
  readonly hugs: string
  readonly hungary: string
  readonly hurtrealbad: string
  readonly hushed: string
  readonly ice_cream: string
  readonly ice_hockey: string
  readonly ice_skate: string
  readonly icecream: string
  readonly iceland: string
  readonly id: string
  readonly ideograph_advantage: string
  readonly imp: string
  readonly inbox_tray: string
  readonly incoming_envelope: string
  readonly india: string
  readonly indonesia: string
  readonly information_desk_person: string
  readonly information_source: string
  readonly innocent: string
  readonly interrobang: string
  readonly iphone: string
  readonly iran: string
  readonly iraq: string
  readonly ireland: string
  readonly isle_of_man: string
  readonly israel: string
  readonly it: string
  readonly izakaya_lantern: string
  readonly jack_o_lantern: string
  readonly jamaica: string
  readonly japan: string
  readonly japanese_castle: string
  readonly japanese_goblin: string
  readonly japanese_ogre: string
  readonly jeans: string
  readonly jersey: string
  readonly jordan: string
  readonly joy: string
  readonly joy_cat: string
  readonly joystick: string
  readonly jp: string
  readonly kaaba: string
  readonly kazakhstan: string
  readonly kenya: string
  readonly key: string
  readonly keyboard: string
  readonly keycap_ten: string
  readonly kick_scooter: string
  readonly kimono: string
  readonly kiribati: string
  readonly kiss: string
  readonly kissing: string
  readonly kissing_cat: string
  readonly kissing_closed_eyes: string
  readonly kissing_heart: string
  readonly kissing_smiling_eyes: string
  readonly kiwi_fruit: string
  readonly knife: string
  readonly koala: string
  readonly koko: string
  readonly kosovo: string
  readonly kr: string
  readonly kuwait: string
  readonly kyrgyzstan: string
  readonly label: string
  readonly lantern: string
  readonly laos: string
  readonly large_blue_circle: string
  readonly large_blue_diamond: string
  readonly large_orange_diamond: string
  readonly last_quarter_moon: string
  readonly last_quarter_moon_with_face: string
  readonly latin_cross: string
  readonly latvia: string
  readonly laughing: string
  readonly leaves: string
  readonly lebanon: string
  readonly ledger: string
  readonly left_luggage: string
  readonly left_right_arrow: string
  readonly leftwards_arrow_with_hook: string
  readonly lemon: string
  readonly leo: string
  readonly leopard: string
  readonly lesotho: string
  readonly level_slider: string
  readonly liberia: string
  readonly libra: string
  readonly libya: string
  readonly liechtenstein: string
  readonly light_rail: string
  readonly link: string
  readonly lion: string
  readonly lips: string
  readonly lipstick: string
  readonly lithuania: string
  readonly lizard: string
  readonly lock: string
  readonly lock_with_ink_pen: string
  readonly lollipop: string
  readonly loop: string
  readonly loud_sound: string
  readonly loudspeaker: string
  readonly love_hotel: string
  readonly love_letter: string
  readonly low_brightness: string
  readonly luxembourg: string
  readonly lying_face: string
  readonly m: string
  readonly macau: string
  readonly macedonia: string
  readonly madagascar: string
  readonly mag: string
  readonly mag_right: string
  readonly mahjong: string
  readonly mailbox: string
  readonly mailbox_closed: string
  readonly mailbox_with_mail: string
  readonly mailbox_with_no_mail: string
  readonly malawi: string
  readonly malaysia: string
  readonly maldives: string
  readonly male_detective: string
  readonly mali: string
  readonly malta: string
  readonly man: string
  readonly man_artist: string
  readonly man_astronaut: string
  readonly man_cartwheeling: string
  readonly man_cook: string
  readonly man_dancing: string
  readonly man_facepalming: string
  readonly man_factory_worker: string
  readonly man_farmer: string
  readonly man_firefighter: string
  readonly man_health_worker: string
  readonly man_in_tuxedo: string
  readonly man_judge: string
  readonly man_juggling: string
  readonly man_mechanic: string
  readonly man_office_worker: string
  readonly man_pilot: string
  readonly man_playing_handball: string
  readonly man_playing_water_polo: string
  readonly man_scientist: string
  readonly man_shrugging: string
  readonly man_singer: string
  readonly man_student: string
  readonly man_teacher: string
  readonly man_technologist: string
  readonly man_with_gua_pi_mao: string
  readonly man_with_turban: string
  readonly mandarin: string
  readonly mans_shoe: string
  readonly mantelpiece_clock: string
  readonly maple_leaf: string
  readonly marshall_islands: string
  readonly martial_arts_uniform: string
  readonly martinique: string
  readonly mask: string
  readonly massage: string
  readonly massage_man: string
  readonly massage_woman: string
  readonly mauritania: string
  readonly mauritius: string
  readonly mayotte: string
  readonly meat_on_bone: string
  readonly medal_military: string
  readonly medal_sports: string
  readonly mega: string
  readonly melon: string
  readonly memo: string
  readonly men_wrestling: string
  readonly menorah: string
  readonly mens: string
  readonly metal: string
  readonly metro: string
  readonly mexico: string
  readonly micronesia: string
  readonly microphone: string
  readonly microscope: string
  readonly middle_finger: string
  readonly milk_glass: string
  readonly milky_way: string
  readonly minibus: string
  readonly minidisc: string
  readonly mobile_phone_off: string
  readonly moldova: string
  readonly monaco: string
  readonly money_mouth_face: string
  readonly money_with_wings: string
  readonly moneybag: string
  readonly mongolia: string
  readonly monkey: string
  readonly monkey_face: string
  readonly monorail: string
  readonly montenegro: string
  readonly montserrat: string
  readonly moon: string
  readonly morocco: string
  readonly mortar_board: string
  readonly mosque: string
  readonly motor_boat: string
  readonly motor_scooter: string
  readonly motorcycle: string
  readonly motorway: string
  readonly mount_fuji: string
  readonly mountain: string
  readonly mountain_bicyclist: string
  readonly mountain_biking_man: string
  readonly mountain_biking_woman: string
  readonly mountain_cableway: string
  readonly mountain_railway: string
  readonly mountain_snow: string
  readonly mouse: string
  readonly mouse2: string
  readonly movie_camera: string
  readonly moyai: string
  readonly mozambique: string
  readonly mrs_claus: string
  readonly muscle: string
  readonly mushroom: string
  readonly musical_keyboard: string
  readonly musical_note: string
  readonly musical_score: string
  readonly mute: string
  readonly myanmar: string
  readonly nail_care: string
  readonly name_badge: string
  readonly namibia: string
  readonly national_park: string
  readonly nauru: string
  readonly nauseated_face: string
  readonly neckbeard: string
  readonly necktie: string
  readonly negative_squared_cross_mark: string
  readonly nepal: string
  readonly nerd_face: string
  readonly netherlands: string
  readonly neutral_face: string
  readonly new: string
  readonly new_caledonia: string
  readonly new_moon: string
  readonly new_moon_with_face: string
  readonly new_zealand: string
  readonly newspaper: string
  readonly newspaper_roll: string
  readonly next_track_button: string
  readonly ng: string
  readonly ng_man: string
  readonly ng_woman: string
  readonly nicaragua: string
  readonly niger: string
  readonly nigeria: string
  readonly night_with_stars: string
  readonly nine: string
  readonly niue: string
  readonly no_bell: string
  readonly no_bicycles: string
  readonly no_entry: string
  readonly no_entry_sign: string
  readonly no_good: string
  readonly no_good_man: string
  readonly no_good_woman: string
  readonly no_mobile_phones: string
  readonly no_mouth: string
  readonly no_pedestrians: string
  readonly no_smoking: string
  readonly 'non-potable_water': string
  readonly norfolk_island: string
  readonly north_korea: string
  readonly northern_mariana_islands: string
  readonly norway: string
  readonly nose: string
  readonly notebook: string
  readonly notebook_with_decorative_cover: string
  readonly notes: string
  readonly nut_and_bolt: string
  readonly o: string
  readonly o2: string
  readonly ocean: string
  readonly octocat: string
  readonly octopus: string
  readonly oden: string
  readonly office: string
  readonly oil_drum: string
  readonly ok: string
  readonly ok_hand: string
  readonly ok_man: string
  readonly ok_woman: string
  readonly old_key: string
  readonly older_man: string
  readonly older_woman: string
  readonly om: string
  readonly oman: string
  readonly on: string
  readonly oncoming_automobile: string
  readonly oncoming_bus: string
  readonly oncoming_police_car: string
  readonly oncoming_taxi: string
  readonly one: string
  readonly open_book: string
  readonly open_file_folder: string
  readonly open_hands: string
  readonly open_mouth: string
  readonly open_umbrella: string
  readonly ophiuchus: string
  readonly orange: string
  readonly orange_book: string
  readonly orthodox_cross: string
  readonly outbox_tray: string
  readonly owl: string
  readonly ox: string
  readonly package: string
  readonly page_facing_up: string
  readonly page_with_curl: string
  readonly pager: string
  readonly paintbrush: string
  readonly pakistan: string
  readonly palau: string
  readonly palestinian_territories: string
  readonly palm_tree: string
  readonly panama: string
  readonly pancakes: string
  readonly panda_face: string
  readonly paperclip: string
  readonly paperclips: string
  readonly papua_new_guinea: string
  readonly paraguay: string
  readonly parasol_on_ground: string
  readonly parking: string
  readonly part_alternation_mark: string
  readonly partly_sunny: string
  readonly passenger_ship: string
  readonly passport_control: string
  readonly pause_button: string
  readonly paw_prints: string
  readonly peace_symbol: string
  readonly peach: string
  readonly peanuts: string
  readonly pear: string
  readonly pen: string
  readonly pencil: string
  readonly pencil2: string
  readonly penguin: string
  readonly pensive: string
  readonly performing_arts: string
  readonly persevere: string
  readonly person_fencing: string
  readonly person_frowning: string
  readonly person_with_blond_hair: string
  readonly person_with_pouting_face: string
  readonly peru: string
  readonly philippines: string
  readonly phone: string
  readonly pick: string
  readonly pig: string
  readonly pig2: string
  readonly pig_nose: string
  readonly pill: string
  readonly pineapple: string
  readonly ping_pong: string
  readonly pisces: string
  readonly pitcairn_islands: string
  readonly pizza: string
  readonly place_of_worship: string
  readonly plate_with_cutlery: string
  readonly play_or_pause_button: string
  readonly point_down: string
  readonly point_left: string
  readonly point_right: string
  readonly point_up: string
  readonly point_up_2: string
  readonly poland: string
  readonly police_car: string
  readonly policeman: string
  readonly policewoman: string
  readonly poodle: string
  readonly poop: string
  readonly popcorn: string
  readonly portugal: string
  readonly post_office: string
  readonly postal_horn: string
  readonly postbox: string
  readonly potable_water: string
  readonly potato: string
  readonly pouch: string
  readonly poultry_leg: string
  readonly pound: string
  readonly pout: string
  readonly pouting_cat: string
  readonly pouting_man: string
  readonly pouting_woman: string
  readonly pray: string
  readonly prayer_beads: string
  readonly pregnant_woman: string
  readonly previous_track_button: string
  readonly prince: string
  readonly princess: string
  readonly printer: string
  readonly puerto_rico: string
  readonly punch: string
  readonly purple_heart: string
  readonly purse: string
  readonly pushpin: string
  readonly put_litter_in_its_place: string
  readonly qatar: string
  readonly question: string
  readonly rabbit: string
  readonly rabbit2: string
  readonly racehorse: string
  readonly racing_car: string
  readonly radio: string
  readonly radio_button: string
  readonly radioactive: string
  readonly rage: string
  readonly rage1: string
  readonly rage2: string
  readonly rage3: string
  readonly rage4: string
  readonly railway_car: string
  readonly railway_track: string
  readonly rainbow: string
  readonly rainbow_flag: string
  readonly raised_back_of_hand: string
  readonly raised_hand: string
  readonly raised_hand_with_fingers_splayed: string
  readonly raised_hands: string
  readonly raising_hand: string
  readonly raising_hand_man: string
  readonly raising_hand_woman: string
  readonly ram: string
  readonly ramen: string
  readonly rat: string
  readonly record_button: string
  readonly recycle: string
  readonly red_car: string
  readonly red_circle: string
  readonly registered: string
  readonly relaxed: string
  readonly relieved: string
  readonly reminder_ribbon: string
  readonly repeat: string
  readonly repeat_one: string
  readonly rescue_worker_helmet: string
  readonly restroom: string
  readonly reunion: string
  readonly revolving_hearts: string
  readonly rewind: string
  readonly rhinoceros: string
  readonly ribbon: string
  readonly rice: string
  readonly rice_ball: string
  readonly rice_cracker: string
  readonly rice_scene: string
  readonly right_anger_bubble: string
  readonly ring: string
  readonly robot: string
  readonly rocket: string
  readonly rofl: string
  readonly roll_eyes: string
  readonly roller_coaster: string
  readonly romania: string
  readonly rooster: string
  readonly rose: string
  readonly rosette: string
  readonly rotating_light: string
  readonly round_pushpin: string
  readonly rowboat: string
  readonly rowing_man: string
  readonly rowing_woman: string
  readonly ru: string
  readonly rugby_football: string
  readonly runner: string
  readonly running: string
  readonly running_man: string
  readonly running_shirt_with_sash: string
  readonly running_woman: string
  readonly rwanda: string
  readonly sa: string
  readonly sagittarius: string
  readonly sailboat: string
  readonly sake: string
  readonly samoa: string
  readonly san_marino: string
  readonly sandal: string
  readonly santa: string
  readonly sao_tome_principe: string
  readonly satellite: string
  readonly satisfied: string
  readonly saudi_arabia: string
  readonly saxophone: string
  readonly school: string
  readonly school_satchel: string
  readonly scissors: string
  readonly scorpion: string
  readonly scorpius: string
  readonly scream: string
  readonly scream_cat: string
  readonly scroll: string
  readonly seat: string
  readonly secret: string
  readonly see_no_evil: string
  readonly seedling: string
  readonly selfie: string
  readonly senegal: string
  readonly serbia: string
  readonly seven: string
  readonly seychelles: string
  readonly shallow_pan_of_food: string
  readonly shamrock: string
  readonly shark: string
  readonly shaved_ice: string
  readonly sheep: string
  readonly shell: string
  readonly shield: string
  readonly shinto_shrine: string
  readonly ship: string
  readonly shipit: string
  readonly shirt: string
  readonly shit: string
  readonly shoe: string
  readonly shopping: string
  readonly shopping_cart: string
  readonly shower: string
  readonly shrimp: string
  readonly sierra_leone: string
  readonly signal_strength: string
  readonly singapore: string
  readonly sint_maarten: string
  readonly six: string
  readonly six_pointed_star: string
  readonly ski: string
  readonly skier: string
  readonly skull: string
  readonly skull_and_crossbones: string
  readonly sleeping: string
  readonly sleeping_bed: string
  readonly sleepy: string
  readonly slightly_frowning_face: string
  readonly slightly_smiling_face: string
  readonly slot_machine: string
  readonly slovakia: string
  readonly slovenia: string
  readonly small_airplane: string
  readonly small_blue_diamond: string
  readonly small_orange_diamond: string
  readonly small_red_triangle: string
  readonly small_red_triangle_down: string
  readonly smile: string
  readonly smile_cat: string
  readonly smiley: string
  readonly smiley_cat: string
  readonly smiling_imp: string
  readonly smirk: string
  readonly smirk_cat: string
  readonly smoking: string
  readonly snail: string
  readonly snake: string
  readonly sneezing_face: string
  readonly snowboarder: string
  readonly snowflake: string
  readonly snowman: string
  readonly snowman_with_snow: string
  readonly sob: string
  readonly soccer: string
  readonly solomon_islands: string
  readonly somalia: string
  readonly soon: string
  readonly sos: string
  readonly sound: string
  readonly south_africa: string
  readonly south_georgia_south_sandwich_islands: string
  readonly south_sudan: string
  readonly space_invader: string
  readonly spades: string
  readonly spaghetti: string
  readonly sparkle: string
  readonly sparkler: string
  readonly sparkles: string
  readonly sparkling_heart: string
  readonly speak_no_evil: string
  readonly speaker: string
  readonly speaking_head: string
  readonly speech_balloon: string
  readonly speedboat: string
  readonly spider: string
  readonly spider_web: string
  readonly spiral_calendar: string
  readonly spiral_notepad: string
  readonly spoon: string
  readonly squid: string
  readonly squirrel: string
  readonly sri_lanka: string
  readonly st_barthelemy: string
  readonly st_helena: string
  readonly st_kitts_nevis: string
  readonly st_lucia: string
  readonly st_pierre_miquelon: string
  readonly st_vincent_grenadines: string
  readonly stadium: string
  readonly star: string
  readonly star2: string
  readonly star_and_crescent: string
  readonly star_of_david: string
  readonly stars: string
  readonly station: string
  readonly statue_of_liberty: string
  readonly steam_locomotive: string
  readonly stew: string
  readonly stop_button: string
  readonly stop_sign: string
  readonly stopwatch: string
  readonly straight_ruler: string
  readonly strawberry: string
  readonly stuck_out_tongue: string
  readonly stuck_out_tongue_closed_eyes: string
  readonly stuck_out_tongue_winking_eye: string
  readonly studio_microphone: string
  readonly stuffed_flatbread: string
  readonly sudan: string
  readonly sun_behind_large_cloud: string
  readonly sun_behind_rain_cloud: string
  readonly sun_behind_small_cloud: string
  readonly sun_with_face: string
  readonly sunflower: string
  readonly sunglasses: string
  readonly sunny: string
  readonly sunrise: string
  readonly sunrise_over_mountains: string
  readonly surfer: string
  readonly surfing_man: string
  readonly surfing_woman: string
  readonly suriname: string
  readonly sushi: string
  readonly suspect: string
  readonly suspension_railway: string
  readonly swaziland: string
  readonly sweat: string
  readonly sweat_drops: string
  readonly sweat_smile: string
  readonly sweden: string
  readonly sweet_potato: string
  readonly swimmer: string
  readonly swimming_man: string
  readonly swimming_woman: string
  readonly switzerland: string
  readonly symbols: string
  readonly synagogue: string
  readonly syria: string
  readonly syringe: string
  readonly taco: string
  readonly tada: string
  readonly taiwan: string
  readonly tajikistan: string
  readonly tanabata_tree: string
  readonly tangerine: string
  readonly tanzania: string
  readonly taurus: string
  readonly taxi: string
  readonly tea: string
  readonly telephone: string
  readonly telephone_receiver: string
  readonly telescope: string
  readonly tennis: string
  readonly tent: string
  readonly thailand: string
  readonly thermometer: string
  readonly thinking: string
  readonly thought_balloon: string
  readonly three: string
  readonly thumbsdown: string
  readonly thumbsup: string
  readonly ticket: string
  readonly tickets: string
  readonly tiger: string
  readonly tiger2: string
  readonly timer_clock: string
  readonly timor_leste: string
  readonly tipping_hand_man: string
  readonly tipping_hand_woman: string
  readonly tired_face: string
  readonly tm: string
  readonly togo: string
  readonly toilet: string
  readonly tokelau: string
  readonly tokyo_tower: string
  readonly tomato: string
  readonly tonga: string
  readonly tongue: string
  readonly top: string
  readonly tophat: string
  readonly tornado: string
  readonly tr: string
  readonly trackball: string
  readonly tractor: string
  readonly traffic_light: string
  readonly train: string
  readonly train2: string
  readonly tram: string
  readonly triangular_flag_on_post: string
  readonly triangular_ruler: string
  readonly trident: string
  readonly trinidad_tobago: string
  readonly triumph: string
  readonly trolleybus: string
  readonly trollface: string
  readonly trophy: string
  readonly tropical_drink: string
  readonly tropical_fish: string
  readonly truck: string
  readonly trumpet: string
  readonly tshirt: string
  readonly tulip: string
  readonly tumbler_glass: string
  readonly tunisia: string
  readonly turkey: string
  readonly turkmenistan: string
  readonly turks_caicos_islands: string
  readonly turtle: string
  readonly tuvalu: string
  readonly tv: string
  readonly twisted_rightwards_arrows: string
  readonly two: string
  readonly two_hearts: string
  readonly two_men_holding_hands: string
  readonly two_women_holding_hands: string
  readonly u5272: string
  readonly u5408: string
  readonly u55b6: string
  readonly u6307: string
  readonly u6708: string
  readonly u6709: string
  readonly u6e80: string
  readonly u7121: string
  readonly u7533: string
  readonly u7981: string
  readonly u7a7a: string
  readonly uganda: string
  readonly uk: string
  readonly ukraine: string
  readonly umbrella: string
  readonly unamused: string
  readonly underage: string
  readonly unicorn: string
  readonly united_arab_emirates: string
  readonly unlock: string
  readonly up: string
  readonly upside_down_face: string
  readonly uruguay: string
  readonly us: string
  readonly us_virgin_islands: string
  readonly uzbekistan: string
  readonly v: string
  readonly vanuatu: string
  readonly vatican_city: string
  readonly venezuela: string
  readonly vertical_traffic_light: string
  readonly vhs: string
  readonly vibration_mode: string
  readonly video_camera: string
  readonly video_game: string
  readonly vietnam: string
  readonly violin: string
  readonly virgo: string
  readonly volcano: string
  readonly volleyball: string
  readonly vs: string
  readonly vulcan_salute: string
  readonly walking: string
  readonly walking_man: string
  readonly walking_woman: string
  readonly wallis_futuna: string
  readonly waning_crescent_moon: string
  readonly waning_gibbous_moon: string
  readonly warning: string
  readonly wastebasket: string
  readonly watch: string
  readonly water_buffalo: string
  readonly watermelon: string
  readonly wave: string
  readonly wavy_dash: string
  readonly waxing_crescent_moon: string
  readonly waxing_gibbous_moon: string
  readonly wc: string
  readonly weary: string
  readonly wedding: string
  readonly weight_lifting_man: string
  readonly weight_lifting_woman: string
  readonly western_sahara: string
  readonly whale: string
  readonly whale2: string
  readonly wheel_of_dharma: string
  readonly wheelchair: string
  readonly white_check_mark: string
  readonly white_circle: string
  readonly white_flag: string
  readonly white_flower: string
  readonly white_large_square: string
  readonly white_medium_small_square: string
  readonly white_medium_square: string
  readonly white_small_square: string
  readonly white_square_button: string
  readonly wilted_flower: string
  readonly wind_chime: string
  readonly wind_face: string
  readonly wine_glass: string
  readonly wink: string
  readonly wolf: string
  readonly woman: string
  readonly woman_artist: string
  readonly woman_astronaut: string
  readonly woman_cartwheeling: string
  readonly woman_cook: string
  readonly woman_facepalming: string
  readonly woman_factory_worker: string
  readonly woman_farmer: string
  readonly woman_firefighter: string
  readonly woman_health_worker: string
  readonly woman_judge: string
  readonly woman_juggling: string
  readonly woman_mechanic: string
  readonly woman_office_worker: string
  readonly woman_pilot: string
  readonly woman_playing_handball: string
  readonly woman_playing_water_polo: string
  readonly woman_scientist: string
  readonly woman_shrugging: string
  readonly woman_singer: string
  readonly woman_student: string
  readonly woman_teacher: string
  readonly woman_technologist: string
  readonly woman_with_turban: string
  readonly womans_clothes: string
  readonly womans_hat: string
  readonly women_wrestling: string
  readonly womens: string
  readonly world_map: string
  readonly worried: string
  readonly wrench: string
  readonly writing_hand: string
  readonly x: string
  readonly yellow_heart: string
  readonly yemen: string
  readonly yen: string
  readonly yin_yang: string
  readonly yum: string
  readonly zambia: string
  readonly zap: string
  readonly zero: string
  readonly zimbabwe: string
  readonly zipper_mouth_face: string
  readonly zzz: string
}

export type Event = {
  readonly id: string
  readonly type: string
  readonly actor: OrganizationSlug2
  readonly repo: RepoSlug
  readonly payload: { readonly member: User
  readonly action: string }
  readonly public: boolean
  readonly created_at: string
  readonly org: OrganizationSlug3
}

export type File = {
  readonly content: CommitSlugMaybe
  readonly commit: GitCommit
}

export type FileContents = {
  readonly filename: string
  readonly type: string
  readonly language: string
  readonly raw_url: string
  readonly size: number
  readonly truncated: boolean
  readonly content: string
}

export type FileSlug = {
  readonly filename: string
  readonly type: string
  readonly language: string
  readonly raw_url: string
  readonly size: number
}

export type GitBlob = {
  readonly sha: string
  readonly url: string
}

export type RepoBranch = {
  readonly name: string
  readonly commit: GitBlob
}

export type GitCommit = {
  readonly sha: string
  readonly url: string
  readonly html_url: string
  readonly author: UserSlug
  readonly committer: UserSlug
  readonly tree: GitBlob
  readonly message: string
  readonly parents: CommitSlugMaybe[]
}

export type GitPatch = {
  readonly sha: string
  readonly filename: string
  readonly status: string
  readonly additions: number
  readonly deletions: number
  readonly changes: number
  readonly blob_url: string
  readonly raw_url: string
  readonly contents_url: string
  readonly patch: string
}

export type GitRef = {
  readonly ref: string
  readonly url: string
  readonly object: { readonly sha: string
  readonly type: string
  readonly url: string }
}

export type Issue = {
  readonly url: string
  readonly repository_url: string
  readonly labels_url: string
  readonly comments_url: string
  readonly events_url: string
  readonly html_url: string
  readonly id: number
  readonly number: number
  readonly title: string
  readonly user: User
  readonly labels: any[]
  readonly state: 'open' | 'closed'
  readonly locked: boolean
  readonly assignee?: any
  readonly assignees: any[]
  readonly milestone?: any
  readonly comments: number
  readonly created_at: string
  readonly updated_at: string
  readonly closed_at: string
  readonly body?: any
  readonly closed_by: User
}

export type IssueComment = {
  readonly url: string
  readonly html_url: string
  readonly issue_url: string
  readonly id: number
  readonly user: User
  readonly created_at: string
  readonly updated_at: string
  readonly body: string
}

export type IssueEvent = {
  readonly id: number
  readonly url: string
  readonly actor: User
  readonly event: string
  readonly commit_id?: any
  readonly commit_url?: any
  readonly created_at: string
  readonly issue: Issue
}

export type IssueLabel = {
  readonly id: number
  readonly url: string
  readonly name: string
  readonly color: string
  readonly default: boolean
}

export type Organization = {
  readonly login: string
  readonly id: number
  readonly url: string
  readonly repos_url: string
  readonly events_url: string
  readonly hooks_url: string
  readonly issues_url: string
  readonly members_url: string
  readonly public_members_url: string
  readonly avatar_url: string
  readonly description?: any
  readonly has_organization_projects: boolean
  readonly has_repository_projects: boolean
  readonly public_repos: number
  readonly public_gists: number
  readonly followers: number
  readonly following: number
  readonly html_url: string
  readonly created_at: string
  readonly updated_at: string
  readonly type: string
  readonly total_private_repos: number
  readonly owned_private_repos: number
  readonly private_gists: number
  readonly disk_usage: number
  readonly collaborators: number
  readonly billing_email: string
  readonly plan: { readonly name: string
  readonly space: number
  readonly private_repos: number
  readonly filled_seats: number
  readonly seats: number }
  readonly default_repository_permission: string
  readonly members_can_create_repositories?: any
}

export type OrganizationSlug = {
  readonly login: string
  readonly id: number
  readonly url: string
  readonly repos_url: string
  readonly events_url: string
  readonly hooks_url: string
  readonly issues_url: string
  readonly members_url: string
  readonly public_members_url: string
  readonly avatar_url: string
  readonly description: string
}

export type OrganizationSlug2 = {
  readonly id: number
  readonly login: string
  readonly display_login: string
  readonly gravatar_id: string
  readonly url: string
  readonly avatar_url: string
}

export type OrganizationSlug3 = {
  readonly id: number
  readonly login: string
  readonly gravatar_id: string
  readonly url: string
  readonly avatar_url: string
}

export type Rate = {
  readonly resources: { readonly core: { readonly limit: number
  readonly remaining: number
  readonly reset: number }
  readonly search: { readonly limit: number
  readonly remaining: number
  readonly reset: number }
  readonly graphql: { readonly limit: number
  readonly remaining: number
  readonly reset: number } }
  readonly rate: { readonly limit: number
  readonly remaining: number
  readonly reset: number }
}

export type RepoComment = {
  readonly url: string
  readonly html_url: string
  readonly id: number
  readonly user: User
  readonly position?: any
  readonly line?: any
  readonly path?: any
  readonly commit_id: string
  readonly created_at: string
  readonly updated_at: string
  readonly body: string
}

export type RepoCommit = {
  readonly sha: string
  readonly commit: GitCommit
  readonly url: string
  readonly html_url: string
  readonly comments_url: string
  readonly author: User
  readonly committer: User
  readonly parents: CommitSlugMaybe[]
  readonly stats: { readonly total: number
  readonly additions: number
  readonly deletions: number }
  readonly files: GitPatch[]
}

export type RepoCommitMaybe = {
  readonly sha: string
  readonly commit: GitCommit
  readonly url: string
  readonly html_url: string
  readonly comments_url: string
  readonly author: User
  readonly committer: User
  readonly parents: CommitSlugMaybe[]
}

export type RepoSlug = {
  readonly id: number
  readonly name: string
  readonly url: string
}

export type RepoSubscription = {
  readonly subscribed: boolean
  readonly ignored: boolean
  readonly reason?: any
  readonly created_at: string
  readonly url: string
  readonly repository_url: string
}

export type Repository = {
  readonly id: number
  readonly name: string
  readonly full_name: string
  readonly owner: User
  readonly private: boolean
  readonly html_url: string
  readonly description: string
  readonly fork: boolean
  readonly url: string
  readonly forks_url: string
  readonly keys_url: string
  readonly collaborators_url: string
  readonly teams_url: string
  readonly hooks_url: string
  readonly issue_events_url: string
  readonly events_url: string
  readonly assignees_url: string
  readonly branches_url: string
  readonly tags_url: string
  readonly blobs_url: string
  readonly git_tags_url: string
  readonly git_refs_url: string
  readonly trees_url: string
  readonly statuses_url: string
  readonly languages_url: string
  readonly stargazers_url: string
  readonly contributors_url: string
  readonly subscribers_url: string
  readonly subscription_url: string
  readonly commits_url: string
  readonly git_commits_url: string
  readonly comments_url: string
  readonly issue_comment_url: string
  readonly contents_url: string
  readonly compare_url: string
  readonly merges_url: string
  readonly archive_url: string
  readonly downloads_url: string
  readonly issues_url: string
  readonly pulls_url: string
  readonly milestones_url: string
  readonly notifications_url: string
  readonly labels_url: string
  readonly releases_url: string
  readonly deployments_url: string
  readonly created_at: string
  readonly updated_at: string
  readonly pushed_at: string
  readonly git_url: string
  readonly ssh_url: string
  readonly clone_url: string
  readonly svn_url: string
  readonly homepage?: any
  readonly size: number
  readonly stargazers_count: number
  readonly watchers_count: number
  readonly language: string
  readonly has_issues: boolean
  readonly has_projects: boolean
  readonly has_downloads: boolean
  readonly has_wiki: boolean
  readonly has_pages: boolean
  readonly forks_count: number
  readonly mirror_url?: any
  readonly open_issues_count: number
  readonly forks: number
  readonly open_issues: number
  readonly watchers: number
  readonly default_branch: string
  readonly permissions: { readonly admin: boolean
  readonly push: boolean
  readonly pull: boolean }
}





export type User = {
  readonly login: string
  readonly name: string
  readonly id: number
  readonly avatar_url: string
  readonly gravatar_id: string
  readonly url: string
  readonly html_url: string
  readonly followers_url: string
  readonly following_url: string
  readonly gists_url: string
  readonly starred_url: string
  readonly subscriptions_url: string
  readonly organizations_url: string
  readonly repos_url: string
  readonly events_url: string
  readonly received_events_url: string
  readonly type: 'user' | 'org'
  readonly site_admin: boolean
}

export type UserEmail = {
  readonly email: string
  readonly primary: boolean
  readonly verified: boolean
  readonly visibility?: 'public' | 'private'
}

export type UserSlug = {
  readonly name: string
  readonly email: string
  readonly date: string
}

  export type SearchResult<T> = {
    readonly total_count: number
    readonly incomplete_results: boolean
    readonly items: T[]
    readonly nextPage?:     { fetch(callback?: Callback<SearchResult<T>>): Promise<SearchResult<T>> }
    readonly previousPage?: { fetch(callback?: Callback<SearchResult<T>>): Promise<SearchResult<T>> }
    readonly firstPage?:    { fetch(callback?: Callback<SearchResult<T>>): Promise<SearchResult<T>> }
    readonly lastPage?:     { fetch(callback?: Callback<SearchResult<T>>): Promise<SearchResult<T>> }
  }


  // Input Param Types
  export type OctokatApplicationsGrantsFnGetParams = & ParamId
& ParamPage
& ParamPerPage & {  }
export type OctokatApplicationsGrantsFnDeleteParams = & ParamId & {  }
export type OctokatApplicationsGrantsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatAuthorizationsFnGetParams = & ParamId & {  }
export type OctokatAuthorizationsFnPatchParams = & ParamId
& ParamScopes
& ParamNote
& ParamNoteUrl
& ParamFingerprint & { add_scopes?: String[];
remove_scopes?: String[]; }
export type OctokatAuthorizationsFnDeleteParams = & ParamId & {  }
export type OctokatAuthorizationsClientsPutParams = & ParamScopes
& ParamNote
& ParamNoteUrl
& ParamFingerprint & { client_secret: String; }
export type OctokatAuthorizationsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatAuthorizationsPostParams = & ParamScopes
& ParamNote
& ParamNoteUrl
& ParamClientId
& ParamFingerprint & { client_secret?: String; }
export type OctokatEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnLockPutParams = & ParamNumber & {  }
export type OctokatReposIssuesFnLockDeleteParams = & ParamNumber & {  }
export type OctokatReposIssuesFnAssigneesPostParams = & ParamNumber & { assignees: String[]; }
export type OctokatReposIssuesFnAssigneesDeleteParams = & ParamNumber
& ParamAssignees & {  }
export type OctokatReposIssuesFnCommentsGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnCommentsPostParams = & ParamNumber
& ParamBody & {  }
export type OctokatReposIssuesFnEventsGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnLabelsFnDeleteParams = & ParamNumber & { name: String; }
export type OctokatReposIssuesFnLabelsGetParams = & ParamNumber & {  }
export type OctokatReposIssuesFnLabelsPostParams = & ParamNumber & { labels: String[]; }
export type OctokatReposIssuesFnLabelsPutParams = & ParamNumber & { labels: String[]; }
export type OctokatReposIssuesFnLabelsDeleteParams = & ParamNumber & {  }
export type OctokatReposIssuesFnTimelineGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnReactionsGetParams = & ParamNumber & { content?: String; }
export type OctokatReposIssuesFnReactionsPostParams = & ParamNumber & { content: String; }
export type OctokatReposIssuesFnGetParams = & ParamNumber & {  }
export type OctokatReposIssuesFnPatchParams = & ParamNumber
& ParamAssignees & { title?: String;
body?: String;
assignee?: String;
state?: String;
milestone?: Number;
labels?: String[]; }
export type OctokatReposIssuesEventsFnGetParams = & ParamId & {  }
export type OctokatReposIssuesEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesCommentsFnReactionsGetParams = & ParamId & { content?: String; }
export type OctokatReposIssuesCommentsFnReactionsPostParams = & ParamId & { content: String; }
export type OctokatReposIssuesCommentsFnGetParams = & ParamId & {  }
export type OctokatReposIssuesCommentsFnPatchParams = & ParamId
& ParamBody & {  }
export type OctokatReposIssuesCommentsFnDeleteParams = & ParamId & {  }
export type OctokatReposIssuesCommentsGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatReposIssuesGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { milestone?: String;
state?: String;
assignee?: String;
creator?: String;
mentioned?: String;
labels?: String;
sort?: String; }
export type OctokatReposIssuesPostParams = & ParamAssignees & { title: String;
body?: String;
assignee?: String;
milestone?: Number;
labels?: String[]; }
export type OctokatReposNotificationsGetParams = & ParamSince & { all?: Boolean;
participating?: Boolean;
before?: String; }
export type OctokatReposNotificationsPutParams =  & { last_read_at?: String; }
export type OctokatReposStargazersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposSubscribersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposSubscriptionGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposSubscriptionPutParams =  & { subscribed?: Boolean;
ignored?: Boolean; }
export type OctokatReposGitBlobsFnGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposGitBlobsPostParams =  & { content: String;
encoding: String; }
export type OctokatReposGitCommitsPostParams =  & { message: String;
tree: String;
parents: String[];
author?: Object;
committer?: Object; }
export type OctokatReposGitRefsFnPatchParams = & ParamSha & { force?: Boolean; }
export type OctokatReposGitRefsTagsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposGitRefsPostParams = & ParamSha & { ref: String; }
export type OctokatReposGitTagsPostParams =  & { tag: String;
message: String;
object: String;
type: String;
tagger: Object; }
export type OctokatReposGitTreesFnGetParams =  & { recursive?: Boolean; }
export type OctokatReposGitTreesPostParams =  & { tree: Object;
base_tree?: String; }
export type OctokatReposAssigneesFnGetParams =  & { assignee: String; }
export type OctokatReposLabelsFnGetParams = & ParamName & {  }
export type OctokatReposLabelsFnPatchParams = & ParamColor & { name: String; }
export type OctokatReposLabelsFnDeleteParams = & ParamName & {  }
export type OctokatReposLabelsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposLabelsPostParams = & ParamName
& ParamColor & {  }
export type OctokatReposMilestonesFnLabelsGetParams = & ParamNumber & {  }
export type OctokatReposMilestonesFnGetParams = & ParamNumber & {  }
export type OctokatReposMilestonesFnPatchParams = & ParamNumber
& ParamState
& ParamDescription & { title: String;
due_on?: Date; }
export type OctokatReposMilestonesFnDeleteParams = & ParamNumber & {  }
export type OctokatReposMilestonesGetParams = & ParamState
& ParamPage
& ParamPerPage & { sort?: String;
direction?: String; }
export type OctokatReposMilestonesPostParams = & ParamState
& ParamDescription & { title: String;
due_on?: Date; }
export type OctokatReposImportAuthorsFnPatchParams =  & { author_id: String;
email?: String;
name?: String; }
export type OctokatReposImportAuthorsGetParams =  & { since?: String; }
export type OctokatReposImportPutParams =  & { vcs_url: String;
vcs?: String;
vcs_username?: String;
vcs_password?: String;
tfvc_project?: String; }
export type OctokatReposProjectsPostParams = & ParamName & { body?: String; }
export type OctokatReposPullsFnCommitsGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnFilesGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnMergeGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnMergePutParams = & ParamNumber & { commit_title?: String;
commit_message?: String;
sha?: String;
merge_method?: String; }
export type OctokatReposPullsFnReviewsFnCommentsGetParams = & ParamNumber
& ParamId
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnReviewsFnEventsPostParams = & ParamNumber
& ParamId & { body?: String;
event?: String; }
export type OctokatReposPullsFnReviewsFnDismissalsPutParams = & ParamNumber
& ParamId
& ParamPage
& ParamPerPage & { message?: String; }
export type OctokatReposPullsFnReviewsFnGetParams = & ParamNumber
& ParamId & {  }
export type OctokatReposPullsFnReviewsGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnReviewsPostParams = & ParamNumber & { body?: String;
event?: String;
comments?: String[];
path?: String;
position?: Number; }
export type OctokatReposPullsFnCommentsGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnCommentsPostParams = & ParamNumber
& ParamBody & { in_reply_to: Number; }
export type OctokatReposPullsFnRequestedReviewersGetParams = & ParamNumber
& ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnRequestedReviewersPostParams = & ParamNumber & { reviewers?: String[]; }
export type OctokatReposPullsFnRequestedReviewersDeleteParams = & ParamNumber & { reviewers?: String[]; }
export type OctokatReposPullsFnGetParams = & ParamNumber & {  }
export type OctokatReposPullsFnPatchParams = & ParamNumber
& ParamState & { title?: String;
body?: String;
base?: String; }
export type OctokatReposPullsCommentsFnReactionsGetParams = & ParamId & { content?: String; }
export type OctokatReposPullsCommentsFnReactionsPostParams = & ParamId & { content: String; }
export type OctokatReposPullsCommentsFnGetParams = & ParamId & {  }
export type OctokatReposPullsCommentsFnPatchParams = & ParamId
& ParamBody & {  }
export type OctokatReposPullsCommentsFnDeleteParams = & ParamId & {  }
export type OctokatReposPullsCommentsGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatReposPullsGetParams = & ParamDirection
& ParamPage
& ParamPerPage & { state?: String;
head?: String;
base?: String;
sort?: String; }
export type OctokatReposPullsPostParams = & ParamHead
& ParamBase & { issue: Number; }
export type OctokatReposCommentsFnReactionsGetParams = & ParamId & { content?: String; }
export type OctokatReposCommentsFnReactionsPostParams = & ParamId & { content: String; }
export type OctokatReposCommentsFnGetParams = & ParamId & {  }
export type OctokatReposCommentsFnPatchParams = & ParamId
& ParamBody & {  }
export type OctokatReposCommentsFnDeleteParams = & ParamId & {  }
export type OctokatReposCommentsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposContributorsGetParams = & ParamPage
& ParamPerPage & { anon?: Boolean; }
export type OctokatReposLanguagesGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposTeamsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposTagsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPostParams =  & { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPutParams =  & { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsDeleteParams =  & { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksPatchParams = & ParamPage
& ParamPerPage & { include_admins?: Boolean;
strict?: Boolean;
contexts?: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksDeleteParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRequiredPullRequestReviewsPatchParams =  & { include_admins?: Boolean; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsPostParams =  & { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsPutParams =  & { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsDeleteParams =  & { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionRestrictionsUsersPostParams =  & { users: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersPutParams =  & { users: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersDeleteParams =  & { users: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnProtectionPutParams = & ParamPage
& ParamPerPage & { required_status_checks: Object;
required_pull_request_reviews: Object;
restrictions: Object; }
export type OctokatReposBranchesFnProtectionDeleteParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesFnGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposBranchesGetParams = & ParamPage
& ParamPerPage & { protected?: Boolean; }
export type OctokatReposCollaboratorsFnPutParams =  & { permission?: String; }
export type OctokatReposCollaboratorsGetParams = & ParamPage
& ParamPerPage & { affiliation?: String; }
export type OctokatReposCommitsFnCommentsGetParams = & ParamPage
& ParamPerPage & { ref: String; }
export type OctokatReposCommitsFnStatusesGetParams = & ParamPage
& ParamPerPage & { ref: String; }
export type OctokatReposCommitsFnStatusGetParams = & ParamPage
& ParamPerPage & { ref: String; }
export type OctokatReposCommitsGetParams = & ParamSince
& ParamUntil
& ParamPage
& ParamPerPage & { sha?: String;
path?: String;
author?: String; }
export type OctokatReposReadmeGetParams =  & { ref?: String; }
export type OctokatReposContentsGetParams =  & { path: String;
ref?: String; }
export type OctokatReposContentsPutParams =  & { path: String;
message: String;
content: String;
sha: String;
branch?: String;
committer?: Object; }
export type OctokatReposContentsDeleteParams =  & { path: String;
message: String;
sha: String;
branch?: String;
committer?: Object; }
export type OctokatReposTarballGetParams =  & { ref?: String; }
export type OctokatReposZipballGetParams =  & { ref?: String; }
export type OctokatReposKeysFnGetParams = & ParamId & {  }
export type OctokatReposKeysFnDeleteParams = & ParamId & {  }
export type OctokatReposKeysGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposKeysPostParams = & ParamTitle
& ParamKey & { read_only?: Boolean; }
export type OctokatReposDeploymentsFnStatusesGetParams = & ParamId & {  }
export type OctokatReposDeploymentsFnStatusesPostParams = & ParamId & { state?: String;
target_url?: String;
log_url?: String;
description?: String;
environment_url?: String;
auto_inactive?: Boolean; }
export type OctokatReposDeploymentsGetParams = & ParamPage
& ParamPerPage & { sha?: String;
ref?: String;
task?: String;
environment?: String; }
export type OctokatReposDeploymentsPostParams =  & { ref: String;
task?: String;
auto_merge?: Boolean;
required_contexts?: String[];
payload?: String;
environment?: String;
description?: String;
transient_environment?: Boolean;
production_environment?: Boolean; }
export type OctokatReposDownloadsFnGetParams = & ParamId & {  }
export type OctokatReposDownloadsFnDeleteParams = & ParamId & {  }
export type OctokatReposDownloadsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposForksGetParams = & ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatReposForksPostParams =  & { organization?: String; }
export type OctokatReposMergesPostParams = & ParamBase
& ParamHead & { commit_message?: String; }
export type OctokatReposPagesBuildsFnGetParams = & ParamId & {  }
export type OctokatReposPagesBuildsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposPagesGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposReleasesFnAssetsGetParams = & ParamId & {  }
export type OctokatReposReleasesFnAssetsPostParams = & ParamId & { filePath: String;
name: String;
label?: String; }
export type OctokatReposReleasesFnGetParams = & ParamId & {  }
export type OctokatReposReleasesFnPatchParams = & ParamId & { tag_name: String;
target_commitish?: String;
name?: String;
body?: String;
draft?: Boolean;
prerelease?: Boolean; }
export type OctokatReposReleasesFnDeleteParams = & ParamId & {  }
export type OctokatReposReleasesTagsGetParams =  & { tag: String; }
export type OctokatReposReleasesAssetsGetParams = & ParamId & {  }
export type OctokatReposReleasesAssetsPatchParams = & ParamId
& ParamName & { label?: String; }
export type OctokatReposReleasesAssetsDeleteParams = & ParamId & {  }
export type OctokatReposReleasesGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposReleasesPostParams =  & { tag_name: String;
target_commitish?: String;
name?: String;
body?: String;
draft?: Boolean;
prerelease?: Boolean; }
export type OctokatReposStatusesPostParams =  & { state: String;
target_url?: String;
description?: String;
context?: String; }
export type OctokatReposTrafficPopularReferrersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposTrafficPopularPathsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposTrafficViewsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposTrafficClonesGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposHooksFnTestsPostParams = & ParamId & {  }
export type OctokatReposHooksFnPingsPostParams = & ParamId & {  }
export type OctokatReposHooksFnGetParams = & ParamId & {  }
export type OctokatReposHooksFnPatchParams = & ParamId
& ParamName & { config: Object;
events?: String[];
add_events?: String[];
remove_events?: String[];
active?: Boolean; }
export type OctokatReposHooksFnDeleteParams = & ParamId & {  }
export type OctokatReposHooksGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposHooksPostParams = & ParamName & { config: Object;
events?: String[];
active?: Boolean; }
export type OctokatReposPatchParams = & ParamName
& ParamDescription
& ParamHomepage
& ParamPrivate
& ParamHasIssues
& ParamHasWiki
& ParamHasDownloads
& ParamDefaultBranch & { allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatNetworksEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsIssuesGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatOrgsMigrationsFnArchiveGetParams = & ParamId & {  }
export type OctokatOrgsMigrationsFnArchiveDeleteParams = & ParamId & {  }
export type OctokatOrgsMigrationsFnReposLockDeleteParams = & ParamId & { repo_name: String; }
export type OctokatOrgsMigrationsFnGetParams = & ParamId & {  }
export type OctokatOrgsMigrationsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsMigrationsPostParams =  & { repositories: String[];
lock_repositories?: Boolean;
exclude_attachments?: Boolean; }
export type OctokatOrgsMembersGetParams = & ParamPage
& ParamPerPage & { filter?: String;
role?: String; }
export type OctokatOrgsMembershipsPutParams =  & { role: String; }
export type OctokatOrgsOutsideCollaboratorsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsTeamsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsTeamsPostParams = & ParamName
& ParamPrivacy & { description?: String;
maintainers?: String[];
repo_names?: String[]; }
export type OctokatOrgsHooksFnPingsPostParams = & ParamId & {  }
export type OctokatOrgsHooksFnGetParams = & ParamId & {  }
export type OctokatOrgsHooksFnPatchParams = & ParamId & { config: Object;
events?: String[];
active?: Boolean; }
export type OctokatOrgsHooksFnDeleteParams = & ParamId & {  }
export type OctokatOrgsHooksGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsHooksPostParams =  & { name: String;
config: Object;
events?: String[];
active?: Boolean; }
export type OctokatOrgsBlocksGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsProjectsPostParams = & ParamName & { body?: String; }
export type OctokatOrgsReposGetParams = & ParamPage
& ParamPerPage & { type?: String; }
export type OctokatOrgsReposPostParams = & ParamName
& ParamDescription
& ParamHomepage
& ParamPrivate
& ParamHasIssues
& ParamHasWiki
& ParamHasDownloads
& ParamAutoInit
& ParamGitignoreTemplate
& ParamLicenseTemplate & { team_id?: Number;
allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatOrgsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatOrgsPatchParams =  & { billing_email?: String;
company?: String;
email?: String;
location?: String;
name?: String;
description?: String;
default_repository_permission?: String;
members_can_create_repositories?: Boolean; }
export type OctokatUsersFnReceivedEventsPublicGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnReceivedEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnEventsPublicGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnEventsOrgsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnStarredGetParams = & ParamDirection
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatUsersFnSubscriptionsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnGistsGetParams = & ParamSince
& ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnOrgsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnReposGetParams = & ParamDirection
& ParamPage
& ParamPerPage & { type?: String;
sort?: String; }
export type OctokatUsersFnFollowersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnFollowingFnGetParams =  & { target_user: String; }
export type OctokatUsersFnFollowingGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersFnKeysGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUsersGetParams =  & { since?: Number; }
export type OctokatNotificationsThreadsSubscriptionGetParams = & ParamId & {  }
export type OctokatNotificationsThreadsSubscriptionPutParams = & ParamId & { subscribed?: Boolean;
ignored?: Boolean; }
export type OctokatNotificationsThreadsSubscriptionDeleteParams = & ParamId & {  }
export type OctokatNotificationsThreadsGetParams = & ParamId & {  }
export type OctokatNotificationsThreadsPatchParams = & ParamId & {  }
export type OctokatNotificationsGetParams = & ParamSince & { all?: Boolean;
participating?: Boolean;
before?: String; }
export type OctokatNotificationsPutParams =  & { last_read_at?: String; }
export type OctokatUserFnGetParams = & ParamId & {  }
export type OctokatUserStarredFnGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserStarredGetParams = & ParamDirection
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatUserSubscriptionsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserIssuesGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatUserReposGetParams = & ParamDirection
& ParamPage
& ParamPerPage & { visibility?: String;
affiliation?: String;
type?: String;
sort?: String; }
export type OctokatUserReposPostParams = & ParamName
& ParamDescription
& ParamHomepage
& ParamPrivate
& ParamHasIssues
& ParamHasWiki
& ParamHasDownloads
& ParamAutoInit
& ParamGitignoreTemplate
& ParamLicenseTemplate & { team_id?: Number;
allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatUserOrgsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserMembershipsOrgsFnPatchParams =  & { state: String; }
export type OctokatUserMembershipsOrgsGetParams =  & { state?: String; }
export type OctokatUserTeamsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserPublicEmailsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserEmailsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserEmailsPostParams =  & { emails: String[]; }
export type OctokatUserEmailsDeleteParams =  & { emails: String[]; }
export type OctokatUserFollowersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserFollowingGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserKeysFnGetParams = & ParamId & {  }
export type OctokatUserKeysFnDeleteParams = & ParamId & {  }
export type OctokatUserKeysGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserKeysPostParams = & ParamTitle
& ParamKey & {  }
export type OctokatUserGpgKeysFnGetParams = & ParamId & {  }
export type OctokatUserGpgKeysFnDeleteParams = & ParamId & {  }
export type OctokatUserGpgKeysGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserGpgKeysPostParams =  & { armored_public_key: String; }
export type OctokatUserPatchParams =  & { name?: String;
email?: String;
blog?: String;
company?: String;
location?: String;
hireable?: Boolean;
bio?: String; }
export type OctokatGistsFnCommitsGetParams = & ParamId & {  }
export type OctokatGistsFnStarGetParams = & ParamId & {  }
export type OctokatGistsFnStarPutParams = & ParamId & {  }
export type OctokatGistsFnStarDeleteParams = & ParamId & {  }
export type OctokatGistsFnForksGetParams = & ParamId
& ParamPage
& ParamPerPage & {  }
export type OctokatGistsFnForksPostParams = & ParamId & {  }
export type OctokatGistsFnCommentsFnGetParams = & ParamId & {  }
export type OctokatGistsFnCommentsFnPatchParams = & ParamId
& ParamBody & {  }
export type OctokatGistsFnCommentsFnDeleteParams = & ParamId & {  }
export type OctokatGistsFnCommentsGetParams = & ParamId & {  }
export type OctokatGistsFnCommentsPostParams = & ParamId
& ParamBody & {  }
export type OctokatGistsFnGetParams = & ParamId & {  }
export type OctokatGistsFnPatchParams = & ParamId
& ParamDescription
& ParamFiles & { content?: String;
filename?: String; }
export type OctokatGistsFnDeleteParams = & ParamId & {  }
export type OctokatGistsPublicGetParams = & ParamSince & {  }
export type OctokatGistsStarredGetParams = & ParamSince & {  }
export type OctokatGistsGetParams = & ParamSince
& ParamPage
& ParamPerPage & {  }
export type OctokatGistsPostParams = & ParamFiles
& ParamDescription & { public: Boolean; }
export type OctokatIntegrationInstallationsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatIntegrationIdentityUserPostParams =  & { nonce?: String; }
export type OctokatInstallationsAccessTokensPostParams =  & { user_id?: String; }
export type OctokatInstallationRepositoriesGetParams =  & { user_id?: String; }
export type OctokatIssuesGetParams = & ParamDirection
& ParamSince
& ParamPage
& ParamPerPage & { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatGitignoreTemplatesFnGetParams =  & { name: String; }
export type OctokatLicensesFnGetParams =  & { license: String; }
export type OctokatMarkdownRawPostParams = & ParamData & {  }
export type OctokatMarkdownPostParams =  & { text: String;
mode?: String;
context?: String; }
export type OctokatOrganizationsGetParams = & ParamPage
& ParamPerPage & { since?: String; }
export type OctokatTeamsMembersGetParams = & ParamId
& ParamPage
& ParamPerPage & { role?: String; }
export type OctokatTeamsMembershipsGetParams = & ParamId & {  }
export type OctokatTeamsMembershipsPutParams = & ParamId & { role?: String; }
export type OctokatTeamsMembershipsDeleteParams = & ParamId & {  }
export type OctokatTeamsReposFnGetParams = & ParamId & {  }
export type OctokatTeamsReposFnPutParams =  & { permission?: String; }
export type OctokatTeamsReposFnDeleteParams = & ParamId & {  }
export type OctokatTeamsReposGetParams = & ParamId
& ParamPage
& ParamPerPage & {  }
export type OctokatTeamsInvitationsGetParams = & ParamId
& ParamPage
& ParamPerPage & {  }
export type OctokatTeamsGetParams = & ParamId & {  }
export type OctokatTeamsPatchParams = & ParamId
& ParamName
& ParamPrivacy & { description?: String; }
export type OctokatTeamsDeleteParams = & ParamId & {  }
export type OctokatProjectsFnColumnsGetParams = & ParamId & {  }
export type OctokatProjectsFnColumnsPostParams = & ParamId
& ParamName & {  }
export type OctokatProjectsFnGetParams = & ParamId & {  }
export type OctokatProjectsFnPatchParams = & ParamId
& ParamName & { body?: String; }
export type OctokatProjectsFnDeleteParams = & ParamId & {  }
export type OctokatProjectsColumnsFnCardsPostParams =  & { note?: String;
content_id?: String;
content_type?: String; }
export type OctokatProjectsColumnsFnMovesPostParams = & ParamId & { position: String; }
export type OctokatProjectsColumnsFnGetParams = & ParamId & {  }
export type OctokatProjectsColumnsFnPatchParams = & ParamId
& ParamName & {  }
export type OctokatProjectsColumnsFnDeleteParams = & ParamId & {  }
export type OctokatProjectsColumnsCardsMovesPostParams = & ParamId & { position: String;
column_id?: String; }
export type OctokatProjectsColumnsCardsGetParams = & ParamId & {  }
export type OctokatProjectsColumnsCardsPatchParams = & ParamId & { note?: String; }
export type OctokatProjectsColumnsCardsDeleteParams = & ParamId & {  }
export type OctokatReactionsDeleteParams = & ParamId & {  }
export type OctokatRepositoriesFnCommunityProfileGetParams = & ParamId & {  }
export type OctokatRepositoriesFnInvitationsFnPatchParams = & ParamId & { permission?: String; }
export type OctokatRepositoriesFnInvitationsFnDeleteParams = & ParamId & {  }
export type OctokatRepositoriesFnInvitationsGetParams = & ParamId & {  }
export type OctokatRepositoriesFnGetParams = & ParamId & {  }
export type OctokatRepositoriesGetParams =  & { since?: String; }
export type OctokatSearchRepositoriesGetParams = & ParamQ
& ParamOrder
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatSearchCodeGetParams = & ParamQ
& ParamOrder
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatSearchCommitsGetParams = & ParamQ
& ParamOrder
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatSearchIssuesGetParams = & ParamQ
& ParamOrder
& ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatSearchUsersGetParams = & ParamQ
& ParamOrder
& ParamPage
& ParamPerPage & { q: String;
sort?: String; }
export type OctokatLegacyUserEmailGetParams =  & { email: String; }
export type OctokatEnterpriseStatsGetParams =  & { type: String; }
export type OctokatAdminLdapUsersMappingPatchParams =  & { ldap_dn: String; }
export type OctokatAdminLdapTeamsMappingPatchParams =  & { team_id: Number;
ldap_dn: String; }
export type OctokatAdminLdapTeamsSyncPostParams =  & { team_id: Number; }
export type OctokatAdminPreReceiveEnvironmentsFnDownloadsLatestGetParams = & ParamId & {  }
export type OctokatAdminPreReceiveEnvironmentsFnDownloadsPostParams = & ParamId & {  }
export type OctokatAdminPreReceiveEnvironmentsFnGetParams = & ParamId & {  }
export type OctokatAdminPreReceiveEnvironmentsFnPatchParams = & ParamId & { name: String;
image_url: String; }
export type OctokatAdminPreReceiveEnvironmentsFnDeleteParams = & ParamId & {  }
export type OctokatAdminPreReceiveEnvironmentsPostParams =  & { name: String;
image_url: String; }
export type OctokatAdminPreReceiveHooksFnGetParams = & ParamId & {  }
export type OctokatAdminPreReceiveHooksFnPatchParams = & ParamId & { hook: Object; }
export type OctokatAdminPreReceiveHooksFnDeleteParams = & ParamId & {  }
export type OctokatAdminPreReceiveHooksPostParams =  & { name: String;
script: String;
script_repository: Object;
environment: Object;
enforcement?: String;
allow_downstream_configuration?: Boolean; }
export type OctokatAdminOrganizationsPostParams =  & { login: String;
admin: String;
profile_name?: String; }
export type OctokatStaffIndexingJobsPostParams =  & { target: String; }

  export default class Octokat {
    constructor(options?: Object)
    

applications: { 
(client_id: String): { 


// Syntactic shortcut used here
tokens(access_token: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }


 }
grants: { 
(application_id: String): { 


fetch(params?: OctokatApplicationsGrantsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatApplicationsGrantsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatApplicationsGrantsFnGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatApplicationsGrantsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatApplicationsGrantsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatApplicationsGrantsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatApplicationsGrantsGetParams, callback?: Callback<any>): Promise<any>
 }

 }
authorizations: { 
(authorization_id: String): { 


fetch(params?: OctokatAuthorizationsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatAuthorizationsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatAuthorizationsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatAuthorizationsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatAuthorizationsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
clients(client_id: String): { 


add(params: OctokatAuthorizationsClientsPutParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatAuthorizationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatAuthorizationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatAuthorizationsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatAuthorizationsPostParams, callback?: Callback<any>): Promise<any>
 }
events: { 


fetch(params?: OctokatEventsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatEventsGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
repos(owner: String, repo: String): { 

events: { 


fetch(params?: OctokatReposEventsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposEventsGetParams, callback?: Callback<any>): Promise<any>
 }
issues: { 
(issue_number: Number): { 

lock: { 


add(params?: OctokatReposIssuesFnLockPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposIssuesFnLockDeleteParams, callback?: Callback<any>): Promise<any>
 }
assignees: { 


create(params: OctokatReposIssuesFnAssigneesPostParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposIssuesFnAssigneesDeleteParams, callback?: Callback<void>): Promise<void>
 }
comments: { 


fetch(params?: OctokatReposIssuesFnCommentsGetParams, callback?: Callback<SearchResult<IssueComment>>): Promise<SearchResult<IssueComment>>
fetchAll(params?: OctokatReposIssuesFnCommentsGetParams, callback?: Callback<IssueComment[]>): Promise<IssueComment[]>
read(params?: OctokatReposIssuesFnCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnCommentsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposIssuesFnCommentsPostParams, callback?: Callback<IssueComment>): Promise<IssueComment>
 }
events: { 


fetch(params?: OctokatReposIssuesFnEventsGetParams, callback?: Callback<SearchResult<IssueEvent>>): Promise<SearchResult<IssueEvent>>
fetchAll(params?: OctokatReposIssuesFnEventsGetParams, callback?: Callback<IssueEvent[]>): Promise<IssueEvent[]>
read(params?: OctokatReposIssuesFnEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnEventsGetParams, callback?: Callback<any>): Promise<any>
 }
labels: { 
(name: String): { 


remove(params: OctokatReposIssuesFnLabelsFnDeleteParams, callback?: Callback<void>): Promise<void>
 }

fetch(params?: OctokatReposIssuesFnLabelsGetParams, callback?: Callback<SearchResult<IssueLabel>>): Promise<SearchResult<IssueLabel>>
fetchAll(params?: OctokatReposIssuesFnLabelsGetParams, callback?: Callback<IssueLabel[]>): Promise<IssueLabel[]>
read(params?: OctokatReposIssuesFnLabelsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnLabelsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposIssuesFnLabelsPostParams, callback?: Callback<SearchResult<IssueLabel>>): Promise<SearchResult<IssueLabel>>
add(params: OctokatReposIssuesFnLabelsPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposIssuesFnLabelsDeleteParams, callback?: Callback<any>): Promise<any>
 }
timeline: { 


fetch(params?: OctokatReposIssuesFnTimelineGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposIssuesFnTimelineGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnTimelineGetParams, callback?: Callback<any>): Promise<any>
 }
reactions: { 


fetch(params?: OctokatReposIssuesFnReactionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposIssuesFnReactionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnReactionsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposIssuesFnReactionsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposIssuesFnGetParams, callback?: Callback<Issue>): Promise<Issue>
read(params?: OctokatReposIssuesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposIssuesFnPatchParams, callback?: Callback<Issue>): Promise<Issue>
 }
events: { 
(issue_event_id: String): { 


fetch(params?: OctokatReposIssuesEventsFnGetParams, callback?: Callback<IssueEvent>): Promise<IssueEvent>
read(params?: OctokatReposIssuesEventsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesEventsFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposIssuesEventsGetParams, callback?: Callback<SearchResult<IssueEvent>>): Promise<SearchResult<IssueEvent>>
fetchAll(params?: OctokatReposIssuesEventsGetParams, callback?: Callback<IssueEvent[]>): Promise<IssueEvent[]>
read(params?: OctokatReposIssuesEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesEventsGetParams, callback?: Callback<any>): Promise<any>
 }
comments: { 
(issue_comment_id: String): { 

reactions: { 


fetch(params?: OctokatReposIssuesCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposIssuesCommentsFnReactionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposIssuesCommentsFnReactionsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposIssuesCommentsFnGetParams, callback?: Callback<IssueComment>): Promise<IssueComment>
read(params?: OctokatReposIssuesCommentsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesCommentsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposIssuesCommentsFnPatchParams, callback?: Callback<IssueComment>): Promise<IssueComment>
remove(params?: OctokatReposIssuesCommentsFnDeleteParams, callback?: Callback<void>): Promise<void>
 }

fetch(params?: OctokatReposIssuesCommentsGetParams, callback?: Callback<SearchResult<IssueComment>>): Promise<SearchResult<IssueComment>>
fetchAll(params?: OctokatReposIssuesCommentsGetParams, callback?: Callback<IssueComment[]>): Promise<IssueComment[]>
read(params?: OctokatReposIssuesCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesCommentsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposIssuesGetParams, callback?: Callback<SearchResult<Issue>>): Promise<SearchResult<Issue>>
fetchAll(params?: OctokatReposIssuesGetParams, callback?: Callback<Issue[]>): Promise<Issue[]>
read(params?: OctokatReposIssuesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposIssuesGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposIssuesPostParams, callback?: Callback<Issue>): Promise<Issue>
 }
notifications: { 


fetch(params?: OctokatReposNotificationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposNotificationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposNotificationsGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatReposNotificationsPutParams, callback?: Callback<any>): Promise<any>
 }
stargazers: { 


fetch(params?: OctokatReposStargazersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposStargazersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposStargazersGetParams, callback?: Callback<any>): Promise<any>
 }
subscribers: { 


fetch(params?: OctokatReposSubscribersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposSubscribersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposSubscribersGetParams, callback?: Callback<any>): Promise<any>
 }
subscription: { 


fetch(params?: OctokatReposSubscriptionGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposSubscriptionGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposSubscriptionGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatReposSubscriptionPutParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
git: { 

blobs: { 
(sha: String): { 


fetch(params?: OctokatReposGitBlobsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposGitBlobsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposGitBlobsFnGetParams, callback?: Callback<any>): Promise<any>
 }

create(params: OctokatReposGitBlobsPostParams, callback?: Callback<any>): Promise<any>
 }
commits: { 
(sha: String): { 


fetch(callback?: Callback<GitCommit>): Promise<GitCommit>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

create(params: OctokatReposGitCommitsPostParams, callback?: Callback<GitCommit>): Promise<GitCommit>
 }
refs: { 
(ref: String): { 


fetch(callback?: Callback<GitCommit>): Promise<GitCommit>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
update(params?: OctokatReposGitRefsFnPatchParams, callback?: Callback<GitRef>): Promise<GitRef>
remove(callback?: Callback<any>): Promise<any>
 }
tags: { 


fetch(params?: OctokatReposGitRefsTagsGetParams, callback?: Callback<GitRef>): Promise<GitRef>
read(params?: OctokatReposGitRefsTagsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposGitRefsTagsGetParams, callback?: Callback<any>): Promise<any>
 }
create(params: OctokatReposGitRefsPostParams, callback?: Callback<GitRef>): Promise<GitRef>
 }
tags: { 
(sha: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

create(params: OctokatReposGitTagsPostParams, callback?: Callback<any>): Promise<any>
 }
trees: { 
(sha: String): { 


fetch(params?: OctokatReposGitTreesFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposGitTreesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposGitTreesFnGetParams, callback?: Callback<any>): Promise<any>
 }

create(params: OctokatReposGitTreesPostParams, callback?: Callback<any>): Promise<any>
 }

 }
assignees: { 
(assignee: String): { 


fetch(params: OctokatReposAssigneesFnGetParams, callback?: Callback<Boolean>): Promise<Boolean>
read(params: OctokatReposAssigneesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposAssigneesFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<SearchResult<User>>): Promise<SearchResult<User>>
fetchAll(callback?: Callback<User[]>): Promise<User[]>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
labels: { 
(label_name: String): { 


fetch(params?: OctokatReposLabelsFnGetParams, callback?: Callback<IssueLabel>): Promise<IssueLabel>
read(params?: OctokatReposLabelsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposLabelsFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatReposLabelsFnPatchParams, callback?: Callback<IssueLabel>): Promise<IssueLabel>
remove(params?: OctokatReposLabelsFnDeleteParams, callback?: Callback<void>): Promise<void>
 }

fetch(params?: OctokatReposLabelsGetParams, callback?: Callback<SearchResult<IssueLabel>>): Promise<SearchResult<IssueLabel>>
fetchAll(params?: OctokatReposLabelsGetParams, callback?: Callback<IssueLabel[]>): Promise<IssueLabel[]>
read(params?: OctokatReposLabelsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposLabelsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposLabelsPostParams, callback?: Callback<IssueLabel>): Promise<IssueLabel>
 }
milestones: { 
(milestone_number: Number): { 

labels: { 


fetch(params?: OctokatReposMilestonesFnLabelsGetParams, callback?: Callback<SearchResult<IssueLabel>>): Promise<SearchResult<IssueLabel>>
fetchAll(params?: OctokatReposMilestonesFnLabelsGetParams, callback?: Callback<IssueLabel[]>): Promise<IssueLabel[]>
read(params?: OctokatReposMilestonesFnLabelsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposMilestonesFnLabelsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposMilestonesFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposMilestonesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposMilestonesFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatReposMilestonesFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposMilestonesFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposMilestonesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposMilestonesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposMilestonesGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposMilestonesPostParams, callback?: Callback<any>): Promise<any>
 }
import: { 

authors: { 
(author_id: String): { 


update(params: OctokatReposImportAuthorsFnPatchParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposImportAuthorsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposImportAuthorsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposImportAuthorsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
update(callback?: Callback<any>): Promise<any>
add(params: OctokatReposImportPutParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
license: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
projects: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(params?: OctokatReposProjectsPostParams, callback?: Callback<any>): Promise<any>
 }
pulls: { 
(pull_request_number: Number): { 

commits: { 


fetch(params?: OctokatReposPullsFnCommitsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnCommitsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnCommitsGetParams, callback?: Callback<any>): Promise<any>
 }
files: { 


fetch(params?: OctokatReposPullsFnFilesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnFilesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnFilesGetParams, callback?: Callback<any>): Promise<any>
 }
merge: { 


fetch(params?: OctokatReposPullsFnMergeGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnMergeGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnMergeGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatReposPullsFnMergePutParams, callback?: Callback<any>): Promise<any>
 }
reviews: { 
(review_id: String): { 

comments: { 


fetch(params?: OctokatReposPullsFnReviewsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnReviewsFnCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnReviewsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
 }
events: { 


create(params?: OctokatReposPullsFnReviewsFnEventsPostParams, callback?: Callback<any>): Promise<any>
 }
dismissals: { 


add(params?: OctokatReposPullsFnReviewsFnDismissalsPutParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPullsFnReviewsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnReviewsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnReviewsFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposPullsFnReviewsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnReviewsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnReviewsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposPullsFnReviewsPostParams, callback?: Callback<any>): Promise<any>
 }
comments: { 


fetch(params?: OctokatReposPullsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposPullsFnCommentsPostParams, callback?: Callback<any>): Promise<any>
 }
requestedReviewers: { 


fetch(params?: OctokatReposPullsFnRequestedReviewersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnRequestedReviewersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnRequestedReviewersGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposPullsFnRequestedReviewersPostParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposPullsFnRequestedReviewersDeleteParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPullsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposPullsFnPatchParams, callback?: Callback<any>): Promise<any>
 }
comments: { 
(pull_request_comment_id: String): { 

reactions: { 


fetch(params?: OctokatReposPullsCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsCommentsFnReactionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposPullsCommentsFnReactionsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPullsCommentsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsCommentsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsCommentsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposPullsCommentsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposPullsCommentsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposPullsCommentsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsCommentsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPullsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPullsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPullsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposPullsPostParams, callback?: Callback<any>): Promise<any>
 }
comments: { 
(repo_comment_id: String): { 

reactions: { 


fetch(params?: OctokatReposCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposCommentsFnReactionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCommentsFnReactionsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposCommentsFnReactionsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposCommentsFnGetParams, callback?: Callback<SearchResult<RepoComment>>): Promise<SearchResult<RepoComment>>
fetchAll(params?: OctokatReposCommentsFnGetParams, callback?: Callback<RepoComment[]>): Promise<RepoComment[]>
read(params?: OctokatReposCommentsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCommentsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposCommentsFnPatchParams, callback?: Callback<SearchResult<RepoComment>>): Promise<SearchResult<RepoComment>>
remove(params?: OctokatReposCommentsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposCommentsGetParams, callback?: Callback<SearchResult<RepoComment>>): Promise<SearchResult<RepoComment>>
fetchAll(params?: OctokatReposCommentsGetParams, callback?: Callback<RepoComment[]>): Promise<RepoComment[]>
read(params?: OctokatReposCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCommentsGetParams, callback?: Callback<any>): Promise<any>
 }
contributors: { 


fetch(params?: OctokatReposContributorsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposContributorsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposContributorsGetParams, callback?: Callback<any>): Promise<any>
 }
languages: { 


fetch(params?: OctokatReposLanguagesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposLanguagesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposLanguagesGetParams, callback?: Callback<any>): Promise<any>
 }
teams: { 


fetch(params?: OctokatReposTeamsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposTeamsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTeamsGetParams, callback?: Callback<any>): Promise<any>
 }
tags: { 


fetch(params?: OctokatReposTagsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposTagsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTagsGetParams, callback?: Callback<any>): Promise<any>
 }
branches: { 
(branch: String): { 

protection: { 

requiredStatusChecks: { 

contexts: { 


fetch(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPostParams, callback?: Callback<any>): Promise<any>
add(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPutParams, callback?: Callback<any>): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsDeleteParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksDeleteParams, callback?: Callback<any>): Promise<any>
 }
requiredPullRequestReviews: { 


fetch(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsPatchParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
restrictions: { 

teams: { 


fetch(params?: OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposBranchesFnProtectionRestrictionsTeamsPostParams, callback?: Callback<any>): Promise<any>
add(params: OctokatReposBranchesFnProtectionRestrictionsTeamsPutParams, callback?: Callback<any>): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRestrictionsTeamsDeleteParams, callback?: Callback<any>): Promise<any>
 }
users: { 


fetch(params?: OctokatReposBranchesFnProtectionRestrictionsUsersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRestrictionsUsersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRestrictionsUsersGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposBranchesFnProtectionRestrictionsUsersPostParams, callback?: Callback<any>): Promise<any>
add(params: OctokatReposBranchesFnProtectionRestrictionsUsersPutParams, callback?: Callback<any>): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRestrictionsUsersDeleteParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnProtectionRestrictionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRestrictionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRestrictionsGetParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnProtectionGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnProtectionGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionGetParams, callback?: Callback<any>): Promise<any>
add(params: OctokatReposBranchesFnProtectionPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposBranchesFnProtectionDeleteParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposBranchesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposBranchesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposBranchesGetParams, callback?: Callback<any>): Promise<any>
 }
collaborators: { 
(username: String): { 

permission: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(params?: OctokatReposCollaboratorsFnPutParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposCollaboratorsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposCollaboratorsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCollaboratorsGetParams, callback?: Callback<any>): Promise<any>
 }
commits: { 
(ref: String): { 

comments: { 


fetch(params: OctokatReposCommitsFnCommentsGetParams, callback?: Callback<SearchResult<RepoComment>>): Promise<SearchResult<RepoComment>>
fetchAll(params: OctokatReposCommitsFnCommentsGetParams, callback?: Callback<RepoComment[]>): Promise<RepoComment[]>
read(params: OctokatReposCommitsFnCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposCommitsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
 }
statuses: { 


fetch(params: OctokatReposCommitsFnStatusesGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatReposCommitsFnStatusesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposCommitsFnStatusesGetParams, callback?: Callback<any>): Promise<any>
 }
status: { 


fetch(params: OctokatReposCommitsFnStatusGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatReposCommitsFnStatusGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposCommitsFnStatusGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(callback?: Callback<RepoCommit>): Promise<RepoCommit>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposCommitsGetParams, callback?: Callback<SearchResult<RepoCommitMaybe>>): Promise<SearchResult<RepoCommitMaybe>>
fetchAll(params?: OctokatReposCommitsGetParams, callback?: Callback<RepoCommitMaybe[]>): Promise<RepoCommitMaybe[]>
read(params?: OctokatReposCommitsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposCommitsGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
compare(base: String, head: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

readme: { 


fetch(params?: OctokatReposReadmeGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposReadmeGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposReadmeGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
contents(path: String): { 


fetch(params: OctokatReposContentsGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatReposContentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposContentsGetParams, callback?: Callback<any>): Promise<any>
add(params: OctokatReposContentsPutParams, callback?: Callback<any>): Promise<any>
remove(params: OctokatReposContentsDeleteParams, callback?: Callback<any>): Promise<any>
 }


// Syntactic shortcut used here
tarball(ref: String): { 


fetch(params?: OctokatReposTarballGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposTarballGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTarballGetParams, callback?: Callback<any>): Promise<any>
 }


// Syntactic shortcut used here
zipball(ref: String): { 


fetch(params?: OctokatReposZipballGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposZipballGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposZipballGetParams, callback?: Callback<any>): Promise<any>
 }

keys: { 
(key_id: String): { 


fetch(params?: OctokatReposKeysFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposKeysFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposKeysFnGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposKeysFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposKeysGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposKeysGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposKeysGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposKeysPostParams, callback?: Callback<any>): Promise<any>
 }
deployments: { 
(deployment_id: String): { 

statuses: { 


fetch(params?: OctokatReposDeploymentsFnStatusesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposDeploymentsFnStatusesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposDeploymentsFnStatusesGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposDeploymentsFnStatusesPostParams, callback?: Callback<any>): Promise<any>
 }

 }

fetch(params?: OctokatReposDeploymentsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposDeploymentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposDeploymentsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposDeploymentsPostParams, callback?: Callback<any>): Promise<any>
 }
downloads: { 
(download_id: String): { 


fetch(params?: OctokatReposDownloadsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposDownloadsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposDownloadsFnGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposDownloadsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposDownloadsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposDownloadsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposDownloadsGetParams, callback?: Callback<any>): Promise<any>
 }
forks: { 


fetch(params?: OctokatReposForksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposForksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposForksGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatReposForksPostParams, callback?: Callback<any>): Promise<any>
 }
merges: { 


create(params?: OctokatReposMergesPostParams, callback?: Callback<any>): Promise<any>
 }
pages: { 

builds: { 
(build_id: String): { 


fetch(params?: OctokatReposPagesBuildsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPagesBuildsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPagesBuildsFnGetParams, callback?: Callback<any>): Promise<any>
 }
latest: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPagesBuildsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPagesBuildsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPagesBuildsGetParams, callback?: Callback<any>): Promise<any>
create(callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposPagesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposPagesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposPagesGetParams, callback?: Callback<any>): Promise<any>
 }
releases: { 
(release_id: String): { 

assets: { 


fetch(params?: OctokatReposReleasesFnAssetsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposReleasesFnAssetsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposReleasesFnAssetsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposReleasesFnAssetsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposReleasesFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposReleasesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposReleasesFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatReposReleasesFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposReleasesFnDeleteParams, callback?: Callback<any>): Promise<any>
 }
latest: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
tags(tag: String): { 


fetch(params: OctokatReposReleasesTagsGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatReposReleasesTagsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatReposReleasesTagsGetParams, callback?: Callback<any>): Promise<any>
 }


// Syntactic shortcut used here
assets(asset_id: String): { 


fetch(params?: OctokatReposReleasesAssetsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposReleasesAssetsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposReleasesAssetsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatReposReleasesAssetsPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposReleasesAssetsDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposReleasesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposReleasesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposReleasesGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposReleasesPostParams, callback?: Callback<any>): Promise<any>
 }
stats: { 

contributors: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
commitActivity: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
codeFrequency: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
participation: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
punchCard: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

 }

// Syntactic shortcut used here
statuses(sha: String): { 


create(params: OctokatReposStatusesPostParams, callback?: Callback<any>): Promise<any>
 }

traffic: { 

popular: { 

referrers: { 


fetch(params?: OctokatReposTrafficPopularReferrersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposTrafficPopularReferrersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTrafficPopularReferrersGetParams, callback?: Callback<any>): Promise<any>
 }
paths: { 


fetch(params?: OctokatReposTrafficPopularPathsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposTrafficPopularPathsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTrafficPopularPathsGetParams, callback?: Callback<any>): Promise<any>
 }

 }
views: { 


fetch(params?: OctokatReposTrafficViewsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposTrafficViewsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTrafficViewsGetParams, callback?: Callback<any>): Promise<any>
 }
clones: { 


fetch(params?: OctokatReposTrafficClonesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposTrafficClonesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposTrafficClonesGetParams, callback?: Callback<any>): Promise<any>
 }

 }
hooks: { 
(repo_hook_id: String): { 

tests: { 


create(params?: OctokatReposHooksFnTestsPostParams, callback?: Callback<any>): Promise<any>
 }
pings: { 


create(params?: OctokatReposHooksFnPingsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatReposHooksFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposHooksFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposHooksFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatReposHooksFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatReposHooksFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatReposHooksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatReposHooksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatReposHooksGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatReposHooksPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
update(params?: OctokatReposPatchParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }


// Syntactic shortcut used here
networks(owner: String, repo: String): { 

events: { 


fetch(params?: OctokatNetworksEventsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatNetworksEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatNetworksEventsGetParams, callback?: Callback<any>): Promise<any>
 }

 }


// Syntactic shortcut used here
orgs(org: String): { 

events: { 


fetch(params?: OctokatOrgsEventsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsEventsGetParams, callback?: Callback<any>): Promise<any>
 }
issues: { 


fetch(params?: OctokatOrgsIssuesGetParams, callback?: Callback<SearchResult<Issue>>): Promise<SearchResult<Issue>>
fetchAll(params?: OctokatOrgsIssuesGetParams, callback?: Callback<Issue[]>): Promise<Issue[]>
read(params?: OctokatOrgsIssuesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsIssuesGetParams, callback?: Callback<any>): Promise<any>
 }
migrations: { 
(migration_id: String): { 

archive: { 


fetch(params?: OctokatOrgsMigrationsFnArchiveGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsMigrationsFnArchiveGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsMigrationsFnArchiveGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatOrgsMigrationsFnArchiveDeleteParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
repos(repo: String): { 

lock: { 


remove(params: OctokatOrgsMigrationsFnReposLockDeleteParams, callback?: Callback<any>): Promise<any>
 }

 }

fetch(params?: OctokatOrgsMigrationsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsMigrationsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsMigrationsFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatOrgsMigrationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsMigrationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsMigrationsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatOrgsMigrationsPostParams, callback?: Callback<any>): Promise<any>
 }
members: { 
(username: String): { 


fetch(callback?: Callback<Boolean>): Promise<Boolean>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatOrgsMembersGetParams, callback?: Callback<SearchResult<User>>): Promise<SearchResult<User>>
fetchAll(params?: OctokatOrgsMembersGetParams, callback?: Callback<User[]>): Promise<User[]>
read(params?: OctokatOrgsMembersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsMembersGetParams, callback?: Callback<any>): Promise<any>
 }
publicMembers: { 
(username: String): { 


fetch(callback?: Callback<Boolean>): Promise<Boolean>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(callback?: Callback<Boolean>): Promise<Boolean>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<SearchResult<User>>): Promise<SearchResult<User>>
fetchAll(callback?: Callback<User[]>): Promise<User[]>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
memberships(username: String): { 


fetch(callback?: Callback<Boolean>): Promise<Boolean>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(params: OctokatOrgsMembershipsPutParams, callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

invitations: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
outsideCollaborators: { 


fetch(params?: OctokatOrgsOutsideCollaboratorsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsOutsideCollaboratorsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsOutsideCollaboratorsGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
outsideCollaborator(username: String): { 


add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

teams: { 


fetch(params?: OctokatOrgsTeamsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsTeamsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsTeamsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatOrgsTeamsPostParams, callback?: Callback<any>): Promise<any>
 }
hooks: { 
(org_hook_id: String): { 

pings: { 


create(params?: OctokatOrgsHooksFnPingsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatOrgsHooksFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsHooksFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsHooksFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatOrgsHooksFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatOrgsHooksFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatOrgsHooksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsHooksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsHooksGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatOrgsHooksPostParams, callback?: Callback<any>): Promise<any>
 }
blocks: { 
(username: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatOrgsBlocksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsBlocksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsBlocksGetParams, callback?: Callback<any>): Promise<any>
 }
projects: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(params?: OctokatOrgsProjectsPostParams, callback?: Callback<any>): Promise<any>
 }
repos: { 


fetch(params?: OctokatOrgsReposGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrgsReposGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsReposGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatOrgsReposPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatOrgsGetParams, callback?: Callback<Organization>): Promise<Organization>
read(params?: OctokatOrgsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrgsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatOrgsPatchParams, callback?: Callback<Organization>): Promise<Organization>
 }

users: { 
(username: String): { 

receivedEvents: { 

public: { 


fetch(params?: OctokatUsersFnReceivedEventsPublicGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnReceivedEventsPublicGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnReceivedEventsPublicGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatUsersFnReceivedEventsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnReceivedEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnReceivedEventsGetParams, callback?: Callback<any>): Promise<any>
 }
events: { 

public: { 


fetch(params?: OctokatUsersFnEventsPublicGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnEventsPublicGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnEventsPublicGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
orgs(org: String): { 


fetch(params?: OctokatUsersFnEventsOrgsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnEventsOrgsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnEventsOrgsGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUsersFnEventsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnEventsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnEventsGetParams, callback?: Callback<any>): Promise<any>
 }
starred: { 


fetch(params?: OctokatUsersFnStarredGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnStarredGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnStarredGetParams, callback?: Callback<any>): Promise<any>
 }
subscriptions: { 


fetch(params?: OctokatUsersFnSubscriptionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnSubscriptionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnSubscriptionsGetParams, callback?: Callback<any>): Promise<any>
 }
gists: { 


fetch(params?: OctokatUsersFnGistsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnGistsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnGistsGetParams, callback?: Callback<any>): Promise<any>
 }
orgs: { 


fetch(params?: OctokatUsersFnOrgsGetParams, callback?: Callback<SearchResult<OrganizationSlug>>): Promise<SearchResult<OrganizationSlug>>
fetchAll(params?: OctokatUsersFnOrgsGetParams, callback?: Callback<OrganizationSlug[]>): Promise<OrganizationSlug[]>
read(params?: OctokatUsersFnOrgsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnOrgsGetParams, callback?: Callback<any>): Promise<any>
 }
repos: { 


fetch(params?: OctokatUsersFnReposGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnReposGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnReposGetParams, callback?: Callback<any>): Promise<any>
 }
followers: { 


fetch(params?: OctokatUsersFnFollowersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnFollowersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnFollowersGetParams, callback?: Callback<any>): Promise<any>
 }
following: { 
(target_user: String): { 


fetch(params: OctokatUsersFnFollowingFnGetParams, callback?: Callback<Boolean>): Promise<Boolean>
read(params: OctokatUsersFnFollowingFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatUsersFnFollowingFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUsersFnFollowingGetParams, callback?: Callback<Boolean>): Promise<Boolean>
read(params?: OctokatUsersFnFollowingGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnFollowingGetParams, callback?: Callback<any>): Promise<any>
 }
keys: { 


fetch(params?: OctokatUsersFnKeysGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersFnKeysGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersFnKeysGetParams, callback?: Callback<any>): Promise<any>
 }
siteAdmin: { 


add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
suspended: { 


add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }
fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUsersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUsersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUsersGetParams, callback?: Callback<any>): Promise<any>
 }
feeds: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
notifications: { 


// Syntactic shortcut used here
threads(thread_id: String): { 

subscription: { 


fetch(params?: OctokatNotificationsThreadsSubscriptionGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatNotificationsThreadsSubscriptionGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatNotificationsThreadsSubscriptionGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatNotificationsThreadsSubscriptionPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatNotificationsThreadsSubscriptionDeleteParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatNotificationsThreadsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatNotificationsThreadsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatNotificationsThreadsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatNotificationsThreadsPatchParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatNotificationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatNotificationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatNotificationsGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatNotificationsPutParams, callback?: Callback<any>): Promise<any>
 }
user: { 
(username: String): { 


fetch(params?: OctokatUserFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserFnGetParams, callback?: Callback<any>): Promise<any>
 }
starred: { 
(owner: String, repo: String): { 


fetch(params?: OctokatUserStarredFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserStarredFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserStarredFnGetParams, callback?: Callback<any>): Promise<any>
add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUserStarredGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserStarredGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserStarredGetParams, callback?: Callback<any>): Promise<any>
 }
subscriptions: { 


fetch(params?: OctokatUserSubscriptionsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserSubscriptionsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserSubscriptionsGetParams, callback?: Callback<any>): Promise<any>
 }
issues: { 


fetch(params?: OctokatUserIssuesGetParams, callback?: Callback<SearchResult<Issue>>): Promise<SearchResult<Issue>>
fetchAll(params?: OctokatUserIssuesGetParams, callback?: Callback<Issue[]>): Promise<Issue[]>
read(params?: OctokatUserIssuesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserIssuesGetParams, callback?: Callback<any>): Promise<any>
 }
repos: { 


fetch(params?: OctokatUserReposGetParams, callback?: Callback<SearchResult<Repository>>): Promise<SearchResult<Repository>>
fetchAll(params?: OctokatUserReposGetParams, callback?: Callback<Repository[]>): Promise<Repository[]>
read(params?: OctokatUserReposGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserReposGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatUserReposPostParams, callback?: Callback<any>): Promise<any>
 }
orgs: { 


fetch(params?: OctokatUserOrgsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserOrgsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserOrgsGetParams, callback?: Callback<any>): Promise<any>
 }
memberships: { 

orgs: { 
(org: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
update(params: OctokatUserMembershipsOrgsFnPatchParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUserMembershipsOrgsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserMembershipsOrgsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserMembershipsOrgsGetParams, callback?: Callback<any>): Promise<any>
 }

 }
teams: { 


fetch(params?: OctokatUserTeamsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserTeamsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserTeamsGetParams, callback?: Callback<any>): Promise<any>
 }
publicEmails: { 


fetch(params?: OctokatUserPublicEmailsGetParams, callback?: Callback<SearchResult<UserEmail>>): Promise<SearchResult<UserEmail>>
fetchAll(params?: OctokatUserPublicEmailsGetParams, callback?: Callback<UserEmail[]>): Promise<UserEmail[]>
read(params?: OctokatUserPublicEmailsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserPublicEmailsGetParams, callback?: Callback<any>): Promise<any>
 }
emails: { 


fetch(params?: OctokatUserEmailsGetParams, callback?: Callback<SearchResult<UserEmail>>): Promise<SearchResult<UserEmail>>
fetchAll(params?: OctokatUserEmailsGetParams, callback?: Callback<UserEmail[]>): Promise<UserEmail[]>
read(params?: OctokatUserEmailsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserEmailsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatUserEmailsPostParams, callback?: Callback<any>): Promise<any>
remove(params: OctokatUserEmailsDeleteParams, callback?: Callback<any>): Promise<any>
 }
followers: { 


fetch(params?: OctokatUserFollowersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserFollowersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserFollowersGetParams, callback?: Callback<any>): Promise<any>
 }
following: { 
(username: String): { 


fetch(callback?: Callback<Boolean>): Promise<Boolean>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(callback?: Callback<Boolean>): Promise<Boolean>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUserFollowingGetParams, callback?: Callback<SearchResult<User>>): Promise<SearchResult<User>>
fetchAll(params?: OctokatUserFollowingGetParams, callback?: Callback<User[]>): Promise<User[]>
read(params?: OctokatUserFollowingGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserFollowingGetParams, callback?: Callback<any>): Promise<any>
 }
keys: { 
(user_key_id: String): { 


fetch(params?: OctokatUserKeysFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserKeysFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserKeysFnGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatUserKeysFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUserKeysGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserKeysGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserKeysGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatUserKeysPostParams, callback?: Callback<any>): Promise<any>
 }
gpgKeys: { 
(gpg_id: String): { 


fetch(params?: OctokatUserGpgKeysFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserGpgKeysFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserGpgKeysFnGetParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatUserGpgKeysFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatUserGpgKeysGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatUserGpgKeysGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatUserGpgKeysGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatUserGpgKeysPostParams, callback?: Callback<any>): Promise<any>
 }
blocks: { 
(username: String): { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
add(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
repositoryInvitations: { 
(invitation_id: String): { 


update(callback?: Callback<any>): Promise<any>
remove(callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
fetch(callback?: Callback<User>): Promise<User>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
update(params?: OctokatUserPatchParams, callback?: Callback<any>): Promise<any>
 }
gists: { 
(gist_id: String): { 

commits: { 


fetch(params?: OctokatGistsFnCommitsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsFnCommitsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnCommitsGetParams, callback?: Callback<any>): Promise<any>
 }
star: { 


fetch(params?: OctokatGistsFnStarGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsFnStarGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnStarGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatGistsFnStarPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatGistsFnStarDeleteParams, callback?: Callback<any>): Promise<any>
 }
forks: { 


fetch(params?: OctokatGistsFnForksGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsFnForksGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnForksGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatGistsFnForksPostParams, callback?: Callback<any>): Promise<any>
 }
comments: { 
(gist_comment_id: String): { 


fetch(params?: OctokatGistsFnCommentsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsFnCommentsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnCommentsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatGistsFnCommentsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatGistsFnCommentsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatGistsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsFnCommentsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnCommentsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatGistsFnCommentsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatGistsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatGistsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatGistsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }
public: { 


fetch(params?: OctokatGistsPublicGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsPublicGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsPublicGetParams, callback?: Callback<any>): Promise<any>
 }
starred: { 


fetch(params?: OctokatGistsStarredGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsStarredGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsStarredGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatGistsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatGistsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatGistsGetParams, callback?: Callback<any>): Promise<any>
create(params: OctokatGistsPostParams, callback?: Callback<any>): Promise<any>
 }
integration: { 

installations: { 


fetch(params?: OctokatIntegrationInstallationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatIntegrationInstallationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatIntegrationInstallationsGetParams, callback?: Callback<any>): Promise<any>
 }
identity: { 

user: { 


create(params?: OctokatIntegrationIdentityUserPostParams, callback?: Callback<any>): Promise<any>
 }

 }

 }

// Syntactic shortcut used here
installations(installation_id: String): { 

accessTokens: { 


create(params?: OctokatInstallationsAccessTokensPostParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
repositories(repository_id: String): { 


create(callback?: Callback<any>): Promise<any>
 }


 }

installation: { 

repositories: { 


fetch(params?: OctokatInstallationRepositoriesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatInstallationRepositoriesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatInstallationRepositoriesGetParams, callback?: Callback<any>): Promise<any>
 }

 }
issues: { 


fetch(params?: OctokatIssuesGetParams, callback?: Callback<SearchResult<Issue>>): Promise<SearchResult<Issue>>
fetchAll(params?: OctokatIssuesGetParams, callback?: Callback<Issue[]>): Promise<Issue[]>
read(params?: OctokatIssuesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatIssuesGetParams, callback?: Callback<any>): Promise<any>
 }
emojis: { 


fetch(callback?: Callback<Emojis>): Promise<Emojis>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
gitignore: { 

templates: { 
(template_name: String): { 


fetch(params: OctokatGitignoreTemplatesFnGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatGitignoreTemplatesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatGitignoreTemplatesFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

 }
licenses: { 
(license: String): { 


fetch(params: OctokatLicensesFnGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatLicensesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatLicensesFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
markdown: { 

raw: { 


create(params?: OctokatMarkdownRawPostParams, callback?: Callback<any>): Promise<any>
 }
create(params: OctokatMarkdownPostParams, callback?: Callback<any>): Promise<any>
 }
meta: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
rateLimit: { 


fetch(callback?: Callback<Rate>): Promise<Rate>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }
organizations: { 


fetch(params?: OctokatOrganizationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatOrganizationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatOrganizationsGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
teams(team_id: String): { 

members: { 


fetch(params?: OctokatTeamsMembersGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatTeamsMembersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsMembersGetParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
memberships(username: String): { 


fetch(params?: OctokatTeamsMembershipsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatTeamsMembershipsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsMembershipsGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatTeamsMembershipsPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatTeamsMembershipsDeleteParams, callback?: Callback<any>): Promise<any>
 }

repos: { 
(owner: String, repo: String): { 


fetch(params?: OctokatTeamsReposFnGetParams, callback?: Callback<Repository>): Promise<Repository>
read(params?: OctokatTeamsReposFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsReposFnGetParams, callback?: Callback<any>): Promise<any>
add(params?: OctokatTeamsReposFnPutParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatTeamsReposFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatTeamsReposGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatTeamsReposGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsReposGetParams, callback?: Callback<any>): Promise<any>
 }
invitations: { 


fetch(params?: OctokatTeamsInvitationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatTeamsInvitationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsInvitationsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatTeamsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatTeamsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatTeamsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatTeamsPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatTeamsDeleteParams, callback?: Callback<any>): Promise<any>
 }

projects: { 
(project_id: String): { 

columns: { 


fetch(params?: OctokatProjectsFnColumnsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatProjectsFnColumnsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatProjectsFnColumnsGetParams, callback?: Callback<any>): Promise<any>
create(params?: OctokatProjectsFnColumnsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatProjectsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatProjectsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatProjectsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatProjectsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatProjectsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }
columns: { 
(column_id: String): { 

cards: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(params?: OctokatProjectsColumnsFnCardsPostParams, callback?: Callback<any>): Promise<any>
 }
moves: { 


create(params: OctokatProjectsColumnsFnMovesPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatProjectsColumnsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatProjectsColumnsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatProjectsColumnsFnGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatProjectsColumnsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatProjectsColumnsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

// Syntactic shortcut used here
cards(card_id: Number): { 

moves: { 


create(params: OctokatProjectsColumnsCardsMovesPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatProjectsColumnsCardsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatProjectsColumnsCardsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatProjectsColumnsCardsGetParams, callback?: Callback<any>): Promise<any>
update(params?: OctokatProjectsColumnsCardsPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatProjectsColumnsCardsDeleteParams, callback?: Callback<any>): Promise<any>
 }


 }

 }

// Syntactic shortcut used here
reactions(reaction_id: String): { 


remove(params?: OctokatReactionsDeleteParams, callback?: Callback<any>): Promise<any>
 }

repositories: { 
(repository_id: String): { 

community: { 

profile: { 


fetch(params?: OctokatRepositoriesFnCommunityProfileGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatRepositoriesFnCommunityProfileGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatRepositoriesFnCommunityProfileGetParams, callback?: Callback<any>): Promise<any>
 }

 }
invitations: { 
(invitation_id: String): { 


update(params?: OctokatRepositoriesFnInvitationsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatRepositoriesFnInvitationsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatRepositoriesFnInvitationsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatRepositoriesFnInvitationsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatRepositoriesFnInvitationsGetParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatRepositoriesFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatRepositoriesFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatRepositoriesFnGetParams, callback?: Callback<any>): Promise<any>
 }

fetch(params?: OctokatRepositoriesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatRepositoriesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatRepositoriesGetParams, callback?: Callback<any>): Promise<any>
 }
search: { 

repositories: { 


fetch(params?: OctokatSearchRepositoriesGetParams, callback?: Callback<SearchResult<Repository>>): Promise<SearchResult<Repository>>
fetchAll(params?: OctokatSearchRepositoriesGetParams, callback?: Callback<Repository[]>): Promise<Repository[]>
read(params?: OctokatSearchRepositoriesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatSearchRepositoriesGetParams, callback?: Callback<any>): Promise<any>
 }
code: { 


fetch(params?: OctokatSearchCodeGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatSearchCodeGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatSearchCodeGetParams, callback?: Callback<any>): Promise<any>
 }
commits: { 


fetch(params?: OctokatSearchCommitsGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatSearchCommitsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatSearchCommitsGetParams, callback?: Callback<any>): Promise<any>
 }
issues: { 


fetch(params?: OctokatSearchIssuesGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatSearchIssuesGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatSearchIssuesGetParams, callback?: Callback<any>): Promise<any>
 }
users: { 


fetch(params: OctokatSearchUsersGetParams, callback?: Callback<SearchResult<User>>): Promise<SearchResult<User>>
fetchAll(params: OctokatSearchUsersGetParams, callback?: Callback<User[]>): Promise<User[]>
read(params: OctokatSearchUsersGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatSearchUsersGetParams, callback?: Callback<any>): Promise<any>
 }

 }
legacy: { 

user: { 


// Syntactic shortcut used here
email(email: String): { 


fetch(params: OctokatLegacyUserEmailGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatLegacyUserEmailGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatLegacyUserEmailGetParams, callback?: Callback<any>): Promise<any>
 }


 }

 }
enterprise: { 


// Syntactic shortcut used here
stats(stats_type: String): { 


fetch(params: OctokatEnterpriseStatsGetParams, callback?: Callback<any>): Promise<any>
read(params: OctokatEnterpriseStatsGetParams, callback?: Callback<String>): Promise<String>
readBinary(params: OctokatEnterpriseStatsGetParams, callback?: Callback<any>): Promise<any>
 }

settings: { 

license: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }

 }

 }
admin: { 

ldap: { 


// Syntactic shortcut used here
users(username: String): { 

mapping: { 


update(params: OctokatAdminLdapUsersMappingPatchParams, callback?: Callback<any>): Promise<any>
 }
sync: { 


create(callback?: Callback<any>): Promise<any>
 }

 }


// Syntactic shortcut used here
teams(team_id: String): { 

mapping: { 


update(params: OctokatAdminLdapTeamsMappingPatchParams, callback?: Callback<any>): Promise<any>
 }
sync: { 


create(params: OctokatAdminLdapTeamsSyncPostParams, callback?: Callback<any>): Promise<any>
 }

 }


 }
preReceiveEnvironments: { 
(environment_id: String): { 

downloads: { 

latest: { 


fetch(params?: OctokatAdminPreReceiveEnvironmentsFnDownloadsLatestGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatAdminPreReceiveEnvironmentsFnDownloadsLatestGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatAdminPreReceiveEnvironmentsFnDownloadsLatestGetParams, callback?: Callback<any>): Promise<any>
 }
create(params?: OctokatAdminPreReceiveEnvironmentsFnDownloadsPostParams, callback?: Callback<any>): Promise<any>
 }
fetch(params?: OctokatAdminPreReceiveEnvironmentsFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatAdminPreReceiveEnvironmentsFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatAdminPreReceiveEnvironmentsFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatAdminPreReceiveEnvironmentsFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatAdminPreReceiveEnvironmentsFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(params: OctokatAdminPreReceiveEnvironmentsPostParams, callback?: Callback<any>): Promise<any>
 }
preReceiveHooks: { 
(pre_receive_hook_id: String): { 


fetch(params?: OctokatAdminPreReceiveHooksFnGetParams, callback?: Callback<any>): Promise<any>
read(params?: OctokatAdminPreReceiveHooksFnGetParams, callback?: Callback<String>): Promise<String>
readBinary(params?: OctokatAdminPreReceiveHooksFnGetParams, callback?: Callback<any>): Promise<any>
update(params: OctokatAdminPreReceiveHooksFnPatchParams, callback?: Callback<any>): Promise<any>
remove(params?: OctokatAdminPreReceiveHooksFnDeleteParams, callback?: Callback<any>): Promise<any>
 }

fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
create(params: OctokatAdminPreReceiveHooksPostParams, callback?: Callback<any>): Promise<any>
 }
organizations: { 


create(params: OctokatAdminOrganizationsPostParams, callback?: Callback<any>): Promise<any>
 }

 }
staff: { 

indexingJobs: { 


create(params: OctokatStaffIndexingJobsPostParams, callback?: Callback<any>): Promise<any>
 }

 }
zen: { 


fetch(callback?: Callback<any>): Promise<any>
read(callback?: Callback<String>): Promise<String>
readBinary(callback?: Callback<any>): Promise<any>
 }


  }
}
