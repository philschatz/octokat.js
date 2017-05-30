

declare module 'octokat' {
  // Base types
  export interface ParamFiles { files: Object }
export interface ParamOwner { owner: String }
export interface ParamUsername { username: String }
export interface ParamOrg { org: String }
export interface ParamRepo { repo: String }
export interface ParamBranch { branch: String }
export interface ParamSha { sha: String }
export interface ParamDescription { description?: String }
export interface ParamId { id: String }
export interface ParamGistId { gist_id: String }
export interface ParamInstallationId { installation_id: String }
export interface ParamRepositoryId { repository_id: String }
export interface ParamCommitId { commit_id: String }
export interface ParamClientId { client_id?: String }
export interface ParamColumnId { column_id: String }
export interface ParamProjectId { project_id: String }
export interface ParamRepoId { repo_id: String }
export interface ParamInvitationId { invitation_id: String }
export interface ParamRef { ref: String }
export interface ParamNumber { number: Number }
export interface ParamIssueNumber { issue_number: Number }
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
  export type UserEmail = { readonly 'email': string;
readonly 'verified': boolean;
readonly 'primary': boolean;
readonly 'visibility': "public" | "private" | null; }

export type CommitDiff = { readonly 'url': string;
readonly 'html_url': string;
readonly 'permalink_url': string;
readonly 'diff_url': string;
readonly 'patch_url': string;
readonly 'base_commit': RepoCommitMaybe;
readonly 'merge_base_commit': RepoCommitMaybe;
readonly 'status': string;
readonly 'ahead_by': number;
readonly 'behind_by': number;
readonly 'total_commits': number;
readonly 'commits': any[];
readonly 'files': any[]; };

export type CommitDiffSlug = { readonly 'url': string;
readonly 'html_url': string;
readonly 'diff_url': string;
readonly 'patch_url': string; };

export type CommitSlugMaybe = { readonly 'sha': string;
readonly 'url': string;
readonly 'html_url': string; };

export type Download = { readonly 'url': string;
readonly 'id': number;
readonly 'html_url': string;
readonly 'name': string;
readonly 'description': string;
readonly 'created_at': string;
readonly 'size': number;
readonly 'download_count': number;
readonly 'content_type': string; };

export type Emojis = { readonly '100': string;
readonly '1234': string;
readonly '+1': string;
readonly '-1': string;
readonly '1st_place_medal': string;
readonly '2nd_place_medal': string;
readonly '3rd_place_medal': string;
readonly '8ball': string;
readonly 'a': string;
readonly 'ab': string;
readonly 'abc': string;
readonly 'abcd': string;
readonly 'accept': string;
readonly 'aerial_tramway': string;
readonly 'afghanistan': string;
readonly 'airplane': string;
readonly 'aland_islands': string;
readonly 'alarm_clock': string;
readonly 'albania': string;
readonly 'alembic': string;
readonly 'algeria': string;
readonly 'alien': string;
readonly 'ambulance': string;
readonly 'american_samoa': string;
readonly 'amphora': string;
readonly 'anchor': string;
readonly 'andorra': string;
readonly 'angel': string;
readonly 'anger': string;
readonly 'angola': string;
readonly 'angry': string;
readonly 'anguilla': string;
readonly 'anguished': string;
readonly 'ant': string;
readonly 'antarctica': string;
readonly 'antigua_barbuda': string;
readonly 'apple': string;
readonly 'aquarius': string;
readonly 'argentina': string;
readonly 'aries': string;
readonly 'armenia': string;
readonly 'arrow_backward': string;
readonly 'arrow_double_down': string;
readonly 'arrow_double_up': string;
readonly 'arrow_down': string;
readonly 'arrow_down_small': string;
readonly 'arrow_forward': string;
readonly 'arrow_heading_down': string;
readonly 'arrow_heading_up': string;
readonly 'arrow_left': string;
readonly 'arrow_lower_left': string;
readonly 'arrow_lower_right': string;
readonly 'arrow_right': string;
readonly 'arrow_right_hook': string;
readonly 'arrow_up': string;
readonly 'arrow_up_down': string;
readonly 'arrow_up_small': string;
readonly 'arrow_upper_left': string;
readonly 'arrow_upper_right': string;
readonly 'arrows_clockwise': string;
readonly 'arrows_counterclockwise': string;
readonly 'art': string;
readonly 'articulated_lorry': string;
readonly 'artificial_satellite': string;
readonly 'aruba': string;
readonly 'asterisk': string;
readonly 'astonished': string;
readonly 'athletic_shoe': string;
readonly 'atm': string;
readonly 'atom': string;
readonly 'atom_symbol': string;
readonly 'australia': string;
readonly 'austria': string;
readonly 'avocado': string;
readonly 'azerbaijan': string;
readonly 'b': string;
readonly 'baby': string;
readonly 'baby_bottle': string;
readonly 'baby_chick': string;
readonly 'baby_symbol': string;
readonly 'back': string;
readonly 'bacon': string;
readonly 'badminton': string;
readonly 'baggage_claim': string;
readonly 'baguette_bread': string;
readonly 'bahamas': string;
readonly 'bahrain': string;
readonly 'balance_scale': string;
readonly 'balloon': string;
readonly 'ballot_box': string;
readonly 'ballot_box_with_check': string;
readonly 'bamboo': string;
readonly 'banana': string;
readonly 'bangbang': string;
readonly 'bangladesh': string;
readonly 'bank': string;
readonly 'bar_chart': string;
readonly 'barbados': string;
readonly 'barber': string;
readonly 'baseball': string;
readonly 'basecamp': string;
readonly 'basecampy': string;
readonly 'basketball': string;
readonly 'basketball_man': string;
readonly 'basketball_woman': string;
readonly 'bat': string;
readonly 'bath': string;
readonly 'bathtub': string;
readonly 'battery': string;
readonly 'beach_umbrella': string;
readonly 'bear': string;
readonly 'bed': string;
readonly 'bee': string;
readonly 'beer': string;
readonly 'beers': string;
readonly 'beetle': string;
readonly 'beginner': string;
readonly 'belarus': string;
readonly 'belgium': string;
readonly 'belize': string;
readonly 'bell': string;
readonly 'bellhop_bell': string;
readonly 'benin': string;
readonly 'bento': string;
readonly 'bermuda': string;
readonly 'bhutan': string;
readonly 'bicyclist': string;
readonly 'bike': string;
readonly 'biking_man': string;
readonly 'biking_woman': string;
readonly 'bikini': string;
readonly 'biohazard': string;
readonly 'bird': string;
readonly 'birthday': string;
readonly 'black_circle': string;
readonly 'black_flag': string;
readonly 'black_heart': string;
readonly 'black_joker': string;
readonly 'black_large_square': string;
readonly 'black_medium_small_square': string;
readonly 'black_medium_square': string;
readonly 'black_nib': string;
readonly 'black_small_square': string;
readonly 'black_square_button': string;
readonly 'blonde_man': string;
readonly 'blonde_woman': string;
readonly 'blossom': string;
readonly 'blowfish': string;
readonly 'blue_book': string;
readonly 'blue_car': string;
readonly 'blue_heart': string;
readonly 'blush': string;
readonly 'boar': string;
readonly 'boat': string;
readonly 'bolivia': string;
readonly 'bomb': string;
readonly 'book': string;
readonly 'bookmark': string;
readonly 'bookmark_tabs': string;
readonly 'books': string;
readonly 'boom': string;
readonly 'boot': string;
readonly 'bosnia_herzegovina': string;
readonly 'botswana': string;
readonly 'bouquet': string;
readonly 'bow': string;
readonly 'bow_and_arrow': string;
readonly 'bowing_man': string;
readonly 'bowing_woman': string;
readonly 'bowling': string;
readonly 'bowtie': string;
readonly 'boxing_glove': string;
readonly 'boy': string;
readonly 'brazil': string;
readonly 'bread': string;
readonly 'bride_with_veil': string;
readonly 'bridge_at_night': string;
readonly 'briefcase': string;
readonly 'british_indian_ocean_territory': string;
readonly 'british_virgin_islands': string;
readonly 'broken_heart': string;
readonly 'brunei': string;
readonly 'bug': string;
readonly 'building_construction': string;
readonly 'bulb': string;
readonly 'bulgaria': string;
readonly 'bullettrain_front': string;
readonly 'bullettrain_side': string;
readonly 'burkina_faso': string;
readonly 'burrito': string;
readonly 'burundi': string;
readonly 'bus': string;
readonly 'business_suit_levitating': string;
readonly 'busstop': string;
readonly 'bust_in_silhouette': string;
readonly 'busts_in_silhouette': string;
readonly 'butterfly': string;
readonly 'cactus': string;
readonly 'cake': string;
readonly 'calendar': string;
readonly 'call_me_hand': string;
readonly 'calling': string;
readonly 'cambodia': string;
readonly 'camel': string;
readonly 'camera': string;
readonly 'camera_flash': string;
readonly 'cameroon': string;
readonly 'camping': string;
readonly 'canada': string;
readonly 'canary_islands': string;
readonly 'cancer': string;
readonly 'candle': string;
readonly 'candy': string;
readonly 'canoe': string;
readonly 'cape_verde': string;
readonly 'capital_abcd': string;
readonly 'capricorn': string;
readonly 'car': string;
readonly 'card_file_box': string;
readonly 'card_index': string;
readonly 'card_index_dividers': string;
readonly 'caribbean_netherlands': string;
readonly 'carousel_horse': string;
readonly 'carrot': string;
readonly 'cat': string;
readonly 'cat2': string;
readonly 'cayman_islands': string;
readonly 'cd': string;
readonly 'central_african_republic': string;
readonly 'chad': string;
readonly 'chains': string;
readonly 'champagne': string;
readonly 'chart': string;
readonly 'chart_with_downwards_trend': string;
readonly 'chart_with_upwards_trend': string;
readonly 'checkered_flag': string;
readonly 'cheese': string;
readonly 'cherries': string;
readonly 'cherry_blossom': string;
readonly 'chestnut': string;
readonly 'chicken': string;
readonly 'children_crossing': string;
readonly 'chile': string;
readonly 'chipmunk': string;
readonly 'chocolate_bar': string;
readonly 'christmas_island': string;
readonly 'christmas_tree': string;
readonly 'church': string;
readonly 'cinema': string;
readonly 'circus_tent': string;
readonly 'city_sunrise': string;
readonly 'city_sunset': string;
readonly 'cityscape': string;
readonly 'cl': string;
readonly 'clamp': string;
readonly 'clap': string;
readonly 'clapper': string;
readonly 'classical_building': string;
readonly 'clinking_glasses': string;
readonly 'clipboard': string;
readonly 'clock1': string;
readonly 'clock10': string;
readonly 'clock1030': string;
readonly 'clock11': string;
readonly 'clock1130': string;
readonly 'clock12': string;
readonly 'clock1230': string;
readonly 'clock130': string;
readonly 'clock2': string;
readonly 'clock230': string;
readonly 'clock3': string;
readonly 'clock330': string;
readonly 'clock4': string;
readonly 'clock430': string;
readonly 'clock5': string;
readonly 'clock530': string;
readonly 'clock6': string;
readonly 'clock630': string;
readonly 'clock7': string;
readonly 'clock730': string;
readonly 'clock8': string;
readonly 'clock830': string;
readonly 'clock9': string;
readonly 'clock930': string;
readonly 'closed_book': string;
readonly 'closed_lock_with_key': string;
readonly 'closed_umbrella': string;
readonly 'cloud': string;
readonly 'cloud_with_lightning': string;
readonly 'cloud_with_lightning_and_rain': string;
readonly 'cloud_with_rain': string;
readonly 'cloud_with_snow': string;
readonly 'clown_face': string;
readonly 'clubs': string;
readonly 'cn': string;
readonly 'cocktail': string;
readonly 'cocos_islands': string;
readonly 'coffee': string;
readonly 'coffin': string;
readonly 'cold_sweat': string;
readonly 'collision': string;
readonly 'colombia': string;
readonly 'comet': string;
readonly 'comoros': string;
readonly 'computer': string;
readonly 'computer_mouse': string;
readonly 'confetti_ball': string;
readonly 'confounded': string;
readonly 'confused': string;
readonly 'congo_brazzaville': string;
readonly 'congo_kinshasa': string;
readonly 'congratulations': string;
readonly 'construction': string;
readonly 'construction_worker': string;
readonly 'construction_worker_man': string;
readonly 'construction_worker_woman': string;
readonly 'control_knobs': string;
readonly 'convenience_store': string;
readonly 'cook_islands': string;
readonly 'cookie': string;
readonly 'cool': string;
readonly 'cop': string;
readonly 'copyright': string;
readonly 'corn': string;
readonly 'costa_rica': string;
readonly 'cote_divoire': string;
readonly 'couch_and_lamp': string;
readonly 'couple': string;
readonly 'couple_with_heart': string;
readonly 'couple_with_heart_man_man': string;
readonly 'couple_with_heart_woman_man': string;
readonly 'couple_with_heart_woman_woman': string;
readonly 'couplekiss_man_man': string;
readonly 'couplekiss_man_woman': string;
readonly 'couplekiss_woman_woman': string;
readonly 'cow': string;
readonly 'cow2': string;
readonly 'cowboy_hat_face': string;
readonly 'crab': string;
readonly 'crayon': string;
readonly 'credit_card': string;
readonly 'crescent_moon': string;
readonly 'cricket': string;
readonly 'croatia': string;
readonly 'crocodile': string;
readonly 'croissant': string;
readonly 'crossed_fingers': string;
readonly 'crossed_flags': string;
readonly 'crossed_swords': string;
readonly 'crown': string;
readonly 'cry': string;
readonly 'crying_cat_face': string;
readonly 'crystal_ball': string;
readonly 'cuba': string;
readonly 'cucumber': string;
readonly 'cupid': string;
readonly 'curacao': string;
readonly 'curly_loop': string;
readonly 'currency_exchange': string;
readonly 'curry': string;
readonly 'custard': string;
readonly 'customs': string;
readonly 'cyclone': string;
readonly 'cyprus': string;
readonly 'czech_republic': string;
readonly 'dagger': string;
readonly 'dancer': string;
readonly 'dancers': string;
readonly 'dancing_men': string;
readonly 'dancing_women': string;
readonly 'dango': string;
readonly 'dark_sunglasses': string;
readonly 'dart': string;
readonly 'dash': string;
readonly 'date': string;
readonly 'de': string;
readonly 'deciduous_tree': string;
readonly 'deer': string;
readonly 'denmark': string;
readonly 'department_store': string;
readonly 'derelict_house': string;
readonly 'desert': string;
readonly 'desert_island': string;
readonly 'desktop_computer': string;
readonly 'detective': string;
readonly 'diamond_shape_with_a_dot_inside': string;
readonly 'diamonds': string;
readonly 'disappointed': string;
readonly 'disappointed_relieved': string;
readonly 'dizzy': string;
readonly 'dizzy_face': string;
readonly 'djibouti': string;
readonly 'do_not_litter': string;
readonly 'dog': string;
readonly 'dog2': string;
readonly 'dollar': string;
readonly 'dolls': string;
readonly 'dolphin': string;
readonly 'dominica': string;
readonly 'dominican_republic': string;
readonly 'door': string;
readonly 'doughnut': string;
readonly 'dove': string;
readonly 'dragon': string;
readonly 'dragon_face': string;
readonly 'dress': string;
readonly 'dromedary_camel': string;
readonly 'drooling_face': string;
readonly 'droplet': string;
readonly 'drum': string;
readonly 'duck': string;
readonly 'dvd': string;
readonly 'e-mail': string;
readonly 'eagle': string;
readonly 'ear': string;
readonly 'ear_of_rice': string;
readonly 'earth_africa': string;
readonly 'earth_americas': string;
readonly 'earth_asia': string;
readonly 'ecuador': string;
readonly 'egg': string;
readonly 'eggplant': string;
readonly 'egypt': string;
readonly 'eight': string;
readonly 'eight_pointed_black_star': string;
readonly 'eight_spoked_asterisk': string;
readonly 'el_salvador': string;
readonly 'electric_plug': string;
readonly 'electron': string;
readonly 'elephant': string;
readonly 'email': string;
readonly 'end': string;
readonly 'envelope': string;
readonly 'envelope_with_arrow': string;
readonly 'equatorial_guinea': string;
readonly 'eritrea': string;
readonly 'es': string;
readonly 'estonia': string;
readonly 'ethiopia': string;
readonly 'eu': string;
readonly 'euro': string;
readonly 'european_castle': string;
readonly 'european_post_office': string;
readonly 'european_union': string;
readonly 'evergreen_tree': string;
readonly 'exclamation': string;
readonly 'expressionless': string;
readonly 'eye': string;
readonly 'eye_speech_bubble': string;
readonly 'eyeglasses': string;
readonly 'eyes': string;
readonly 'face_with_head_bandage': string;
readonly 'face_with_thermometer': string;
readonly 'facepunch': string;
readonly 'factory': string;
readonly 'falkland_islands': string;
readonly 'fallen_leaf': string;
readonly 'family': string;
readonly 'family_man_boy': string;
readonly 'family_man_boy_boy': string;
readonly 'family_man_girl': string;
readonly 'family_man_girl_boy': string;
readonly 'family_man_girl_girl': string;
readonly 'family_man_man_boy': string;
readonly 'family_man_man_boy_boy': string;
readonly 'family_man_man_girl': string;
readonly 'family_man_man_girl_boy': string;
readonly 'family_man_man_girl_girl': string;
readonly 'family_man_woman_boy': string;
readonly 'family_man_woman_boy_boy': string;
readonly 'family_man_woman_girl': string;
readonly 'family_man_woman_girl_boy': string;
readonly 'family_man_woman_girl_girl': string;
readonly 'family_woman_boy': string;
readonly 'family_woman_boy_boy': string;
readonly 'family_woman_girl': string;
readonly 'family_woman_girl_boy': string;
readonly 'family_woman_girl_girl': string;
readonly 'family_woman_woman_boy': string;
readonly 'family_woman_woman_boy_boy': string;
readonly 'family_woman_woman_girl': string;
readonly 'family_woman_woman_girl_boy': string;
readonly 'family_woman_woman_girl_girl': string;
readonly 'faroe_islands': string;
readonly 'fast_forward': string;
readonly 'fax': string;
readonly 'fearful': string;
readonly 'feelsgood': string;
readonly 'feet': string;
readonly 'female_detective': string;
readonly 'ferris_wheel': string;
readonly 'ferry': string;
readonly 'field_hockey': string;
readonly 'fiji': string;
readonly 'file_cabinet': string;
readonly 'file_folder': string;
readonly 'film_projector': string;
readonly 'film_strip': string;
readonly 'finland': string;
readonly 'finnadie': string;
readonly 'fire': string;
readonly 'fire_engine': string;
readonly 'fireworks': string;
readonly 'first_quarter_moon': string;
readonly 'first_quarter_moon_with_face': string;
readonly 'fish': string;
readonly 'fish_cake': string;
readonly 'fishing_pole_and_fish': string;
readonly 'fist': string;
readonly 'fist_left': string;
readonly 'fist_oncoming': string;
readonly 'fist_raised': string;
readonly 'fist_right': string;
readonly 'five': string;
readonly 'flags': string;
readonly 'flashlight': string;
readonly 'fleur_de_lis': string;
readonly 'flight_arrival': string;
readonly 'flight_departure': string;
readonly 'flipper': string;
readonly 'floppy_disk': string;
readonly 'flower_playing_cards': string;
readonly 'flushed': string;
readonly 'fog': string;
readonly 'foggy': string;
readonly 'football': string;
readonly 'footprints': string;
readonly 'fork_and_knife': string;
readonly 'fountain': string;
readonly 'fountain_pen': string;
readonly 'four': string;
readonly 'four_leaf_clover': string;
readonly 'fox_face': string;
readonly 'fr': string;
readonly 'framed_picture': string;
readonly 'free': string;
readonly 'french_guiana': string;
readonly 'french_polynesia': string;
readonly 'french_southern_territories': string;
readonly 'fried_egg': string;
readonly 'fried_shrimp': string;
readonly 'fries': string;
readonly 'frog': string;
readonly 'frowning': string;
readonly 'frowning_face': string;
readonly 'frowning_man': string;
readonly 'frowning_woman': string;
readonly 'fu': string;
readonly 'fuelpump': string;
readonly 'full_moon': string;
readonly 'full_moon_with_face': string;
readonly 'funeral_urn': string;
readonly 'gabon': string;
readonly 'gambia': string;
readonly 'game_die': string;
readonly 'gb': string;
readonly 'gear': string;
readonly 'gem': string;
readonly 'gemini': string;
readonly 'georgia': string;
readonly 'ghana': string;
readonly 'ghost': string;
readonly 'gibraltar': string;
readonly 'gift': string;
readonly 'gift_heart': string;
readonly 'girl': string;
readonly 'globe_with_meridians': string;
readonly 'goal_net': string;
readonly 'goat': string;
readonly 'goberserk': string;
readonly 'godmode': string;
readonly 'golf': string;
readonly 'golfing_man': string;
readonly 'golfing_woman': string;
readonly 'gorilla': string;
readonly 'grapes': string;
readonly 'greece': string;
readonly 'green_apple': string;
readonly 'green_book': string;
readonly 'green_heart': string;
readonly 'green_salad': string;
readonly 'greenland': string;
readonly 'grenada': string;
readonly 'grey_exclamation': string;
readonly 'grey_question': string;
readonly 'grimacing': string;
readonly 'grin': string;
readonly 'grinning': string;
readonly 'guadeloupe': string;
readonly 'guam': string;
readonly 'guardsman': string;
readonly 'guardswoman': string;
readonly 'guatemala': string;
readonly 'guernsey': string;
readonly 'guinea': string;
readonly 'guinea_bissau': string;
readonly 'guitar': string;
readonly 'gun': string;
readonly 'guyana': string;
readonly 'haircut': string;
readonly 'haircut_man': string;
readonly 'haircut_woman': string;
readonly 'haiti': string;
readonly 'hamburger': string;
readonly 'hammer': string;
readonly 'hammer_and_pick': string;
readonly 'hammer_and_wrench': string;
readonly 'hamster': string;
readonly 'hand': string;
readonly 'handbag': string;
readonly 'handshake': string;
readonly 'hankey': string;
readonly 'hash': string;
readonly 'hatched_chick': string;
readonly 'hatching_chick': string;
readonly 'headphones': string;
readonly 'hear_no_evil': string;
readonly 'heart': string;
readonly 'heart_decoration': string;
readonly 'heart_eyes': string;
readonly 'heart_eyes_cat': string;
readonly 'heartbeat': string;
readonly 'heartpulse': string;
readonly 'hearts': string;
readonly 'heavy_check_mark': string;
readonly 'heavy_division_sign': string;
readonly 'heavy_dollar_sign': string;
readonly 'heavy_exclamation_mark': string;
readonly 'heavy_heart_exclamation': string;
readonly 'heavy_minus_sign': string;
readonly 'heavy_multiplication_x': string;
readonly 'heavy_plus_sign': string;
readonly 'helicopter': string;
readonly 'herb': string;
readonly 'hibiscus': string;
readonly 'high_brightness': string;
readonly 'high_heel': string;
readonly 'hocho': string;
readonly 'hole': string;
readonly 'honduras': string;
readonly 'honey_pot': string;
readonly 'honeybee': string;
readonly 'hong_kong': string;
readonly 'horse': string;
readonly 'horse_racing': string;
readonly 'hospital': string;
readonly 'hot_pepper': string;
readonly 'hotdog': string;
readonly 'hotel': string;
readonly 'hotsprings': string;
readonly 'hourglass': string;
readonly 'hourglass_flowing_sand': string;
readonly 'house': string;
readonly 'house_with_garden': string;
readonly 'houses': string;
readonly 'hugs': string;
readonly 'hungary': string;
readonly 'hurtrealbad': string;
readonly 'hushed': string;
readonly 'ice_cream': string;
readonly 'ice_hockey': string;
readonly 'ice_skate': string;
readonly 'icecream': string;
readonly 'iceland': string;
readonly 'id': string;
readonly 'ideograph_advantage': string;
readonly 'imp': string;
readonly 'inbox_tray': string;
readonly 'incoming_envelope': string;
readonly 'india': string;
readonly 'indonesia': string;
readonly 'information_desk_person': string;
readonly 'information_source': string;
readonly 'innocent': string;
readonly 'interrobang': string;
readonly 'iphone': string;
readonly 'iran': string;
readonly 'iraq': string;
readonly 'ireland': string;
readonly 'isle_of_man': string;
readonly 'israel': string;
readonly 'it': string;
readonly 'izakaya_lantern': string;
readonly 'jack_o_lantern': string;
readonly 'jamaica': string;
readonly 'japan': string;
readonly 'japanese_castle': string;
readonly 'japanese_goblin': string;
readonly 'japanese_ogre': string;
readonly 'jeans': string;
readonly 'jersey': string;
readonly 'jordan': string;
readonly 'joy': string;
readonly 'joy_cat': string;
readonly 'joystick': string;
readonly 'jp': string;
readonly 'kaaba': string;
readonly 'kazakhstan': string;
readonly 'kenya': string;
readonly 'key': string;
readonly 'keyboard': string;
readonly 'keycap_ten': string;
readonly 'kick_scooter': string;
readonly 'kimono': string;
readonly 'kiribati': string;
readonly 'kiss': string;
readonly 'kissing': string;
readonly 'kissing_cat': string;
readonly 'kissing_closed_eyes': string;
readonly 'kissing_heart': string;
readonly 'kissing_smiling_eyes': string;
readonly 'kiwi_fruit': string;
readonly 'knife': string;
readonly 'koala': string;
readonly 'koko': string;
readonly 'kosovo': string;
readonly 'kr': string;
readonly 'kuwait': string;
readonly 'kyrgyzstan': string;
readonly 'label': string;
readonly 'lantern': string;
readonly 'laos': string;
readonly 'large_blue_circle': string;
readonly 'large_blue_diamond': string;
readonly 'large_orange_diamond': string;
readonly 'last_quarter_moon': string;
readonly 'last_quarter_moon_with_face': string;
readonly 'latin_cross': string;
readonly 'latvia': string;
readonly 'laughing': string;
readonly 'leaves': string;
readonly 'lebanon': string;
readonly 'ledger': string;
readonly 'left_luggage': string;
readonly 'left_right_arrow': string;
readonly 'leftwards_arrow_with_hook': string;
readonly 'lemon': string;
readonly 'leo': string;
readonly 'leopard': string;
readonly 'lesotho': string;
readonly 'level_slider': string;
readonly 'liberia': string;
readonly 'libra': string;
readonly 'libya': string;
readonly 'liechtenstein': string;
readonly 'light_rail': string;
readonly 'link': string;
readonly 'lion': string;
readonly 'lips': string;
readonly 'lipstick': string;
readonly 'lithuania': string;
readonly 'lizard': string;
readonly 'lock': string;
readonly 'lock_with_ink_pen': string;
readonly 'lollipop': string;
readonly 'loop': string;
readonly 'loud_sound': string;
readonly 'loudspeaker': string;
readonly 'love_hotel': string;
readonly 'love_letter': string;
readonly 'low_brightness': string;
readonly 'luxembourg': string;
readonly 'lying_face': string;
readonly 'm': string;
readonly 'macau': string;
readonly 'macedonia': string;
readonly 'madagascar': string;
readonly 'mag': string;
readonly 'mag_right': string;
readonly 'mahjong': string;
readonly 'mailbox': string;
readonly 'mailbox_closed': string;
readonly 'mailbox_with_mail': string;
readonly 'mailbox_with_no_mail': string;
readonly 'malawi': string;
readonly 'malaysia': string;
readonly 'maldives': string;
readonly 'male_detective': string;
readonly 'mali': string;
readonly 'malta': string;
readonly 'man': string;
readonly 'man_artist': string;
readonly 'man_astronaut': string;
readonly 'man_cartwheeling': string;
readonly 'man_cook': string;
readonly 'man_dancing': string;
readonly 'man_facepalming': string;
readonly 'man_factory_worker': string;
readonly 'man_farmer': string;
readonly 'man_firefighter': string;
readonly 'man_health_worker': string;
readonly 'man_in_tuxedo': string;
readonly 'man_judge': string;
readonly 'man_juggling': string;
readonly 'man_mechanic': string;
readonly 'man_office_worker': string;
readonly 'man_pilot': string;
readonly 'man_playing_handball': string;
readonly 'man_playing_water_polo': string;
readonly 'man_scientist': string;
readonly 'man_shrugging': string;
readonly 'man_singer': string;
readonly 'man_student': string;
readonly 'man_teacher': string;
readonly 'man_technologist': string;
readonly 'man_with_gua_pi_mao': string;
readonly 'man_with_turban': string;
readonly 'mandarin': string;
readonly 'mans_shoe': string;
readonly 'mantelpiece_clock': string;
readonly 'maple_leaf': string;
readonly 'marshall_islands': string;
readonly 'martial_arts_uniform': string;
readonly 'martinique': string;
readonly 'mask': string;
readonly 'massage': string;
readonly 'massage_man': string;
readonly 'massage_woman': string;
readonly 'mauritania': string;
readonly 'mauritius': string;
readonly 'mayotte': string;
readonly 'meat_on_bone': string;
readonly 'medal_military': string;
readonly 'medal_sports': string;
readonly 'mega': string;
readonly 'melon': string;
readonly 'memo': string;
readonly 'men_wrestling': string;
readonly 'menorah': string;
readonly 'mens': string;
readonly 'metal': string;
readonly 'metro': string;
readonly 'mexico': string;
readonly 'micronesia': string;
readonly 'microphone': string;
readonly 'microscope': string;
readonly 'middle_finger': string;
readonly 'milk_glass': string;
readonly 'milky_way': string;
readonly 'minibus': string;
readonly 'minidisc': string;
readonly 'mobile_phone_off': string;
readonly 'moldova': string;
readonly 'monaco': string;
readonly 'money_mouth_face': string;
readonly 'money_with_wings': string;
readonly 'moneybag': string;
readonly 'mongolia': string;
readonly 'monkey': string;
readonly 'monkey_face': string;
readonly 'monorail': string;
readonly 'montenegro': string;
readonly 'montserrat': string;
readonly 'moon': string;
readonly 'morocco': string;
readonly 'mortar_board': string;
readonly 'mosque': string;
readonly 'motor_boat': string;
readonly 'motor_scooter': string;
readonly 'motorcycle': string;
readonly 'motorway': string;
readonly 'mount_fuji': string;
readonly 'mountain': string;
readonly 'mountain_bicyclist': string;
readonly 'mountain_biking_man': string;
readonly 'mountain_biking_woman': string;
readonly 'mountain_cableway': string;
readonly 'mountain_railway': string;
readonly 'mountain_snow': string;
readonly 'mouse': string;
readonly 'mouse2': string;
readonly 'movie_camera': string;
readonly 'moyai': string;
readonly 'mozambique': string;
readonly 'mrs_claus': string;
readonly 'muscle': string;
readonly 'mushroom': string;
readonly 'musical_keyboard': string;
readonly 'musical_note': string;
readonly 'musical_score': string;
readonly 'mute': string;
readonly 'myanmar': string;
readonly 'nail_care': string;
readonly 'name_badge': string;
readonly 'namibia': string;
readonly 'national_park': string;
readonly 'nauru': string;
readonly 'nauseated_face': string;
readonly 'neckbeard': string;
readonly 'necktie': string;
readonly 'negative_squared_cross_mark': string;
readonly 'nepal': string;
readonly 'nerd_face': string;
readonly 'netherlands': string;
readonly 'neutral_face': string;
readonly 'new': string;
readonly 'new_caledonia': string;
readonly 'new_moon': string;
readonly 'new_moon_with_face': string;
readonly 'new_zealand': string;
readonly 'newspaper': string;
readonly 'newspaper_roll': string;
readonly 'next_track_button': string;
readonly 'ng': string;
readonly 'ng_man': string;
readonly 'ng_woman': string;
readonly 'nicaragua': string;
readonly 'niger': string;
readonly 'nigeria': string;
readonly 'night_with_stars': string;
readonly 'nine': string;
readonly 'niue': string;
readonly 'no_bell': string;
readonly 'no_bicycles': string;
readonly 'no_entry': string;
readonly 'no_entry_sign': string;
readonly 'no_good': string;
readonly 'no_good_man': string;
readonly 'no_good_woman': string;
readonly 'no_mobile_phones': string;
readonly 'no_mouth': string;
readonly 'no_pedestrians': string;
readonly 'no_smoking': string;
readonly 'non-potable_water': string;
readonly 'norfolk_island': string;
readonly 'north_korea': string;
readonly 'northern_mariana_islands': string;
readonly 'norway': string;
readonly 'nose': string;
readonly 'notebook': string;
readonly 'notebook_with_decorative_cover': string;
readonly 'notes': string;
readonly 'nut_and_bolt': string;
readonly 'o': string;
readonly 'o2': string;
readonly 'ocean': string;
readonly 'octocat': string;
readonly 'octopus': string;
readonly 'oden': string;
readonly 'office': string;
readonly 'oil_drum': string;
readonly 'ok': string;
readonly 'ok_hand': string;
readonly 'ok_man': string;
readonly 'ok_woman': string;
readonly 'old_key': string;
readonly 'older_man': string;
readonly 'older_woman': string;
readonly 'om': string;
readonly 'oman': string;
readonly 'on': string;
readonly 'oncoming_automobile': string;
readonly 'oncoming_bus': string;
readonly 'oncoming_police_car': string;
readonly 'oncoming_taxi': string;
readonly 'one': string;
readonly 'open_book': string;
readonly 'open_file_folder': string;
readonly 'open_hands': string;
readonly 'open_mouth': string;
readonly 'open_umbrella': string;
readonly 'ophiuchus': string;
readonly 'orange': string;
readonly 'orange_book': string;
readonly 'orthodox_cross': string;
readonly 'outbox_tray': string;
readonly 'owl': string;
readonly 'ox': string;
readonly 'package': string;
readonly 'page_facing_up': string;
readonly 'page_with_curl': string;
readonly 'pager': string;
readonly 'paintbrush': string;
readonly 'pakistan': string;
readonly 'palau': string;
readonly 'palestinian_territories': string;
readonly 'palm_tree': string;
readonly 'panama': string;
readonly 'pancakes': string;
readonly 'panda_face': string;
readonly 'paperclip': string;
readonly 'paperclips': string;
readonly 'papua_new_guinea': string;
readonly 'paraguay': string;
readonly 'parasol_on_ground': string;
readonly 'parking': string;
readonly 'part_alternation_mark': string;
readonly 'partly_sunny': string;
readonly 'passenger_ship': string;
readonly 'passport_control': string;
readonly 'pause_button': string;
readonly 'paw_prints': string;
readonly 'peace_symbol': string;
readonly 'peach': string;
readonly 'peanuts': string;
readonly 'pear': string;
readonly 'pen': string;
readonly 'pencil': string;
readonly 'pencil2': string;
readonly 'penguin': string;
readonly 'pensive': string;
readonly 'performing_arts': string;
readonly 'persevere': string;
readonly 'person_fencing': string;
readonly 'person_frowning': string;
readonly 'person_with_blond_hair': string;
readonly 'person_with_pouting_face': string;
readonly 'peru': string;
readonly 'philippines': string;
readonly 'phone': string;
readonly 'pick': string;
readonly 'pig': string;
readonly 'pig2': string;
readonly 'pig_nose': string;
readonly 'pill': string;
readonly 'pineapple': string;
readonly 'ping_pong': string;
readonly 'pisces': string;
readonly 'pitcairn_islands': string;
readonly 'pizza': string;
readonly 'place_of_worship': string;
readonly 'plate_with_cutlery': string;
readonly 'play_or_pause_button': string;
readonly 'point_down': string;
readonly 'point_left': string;
readonly 'point_right': string;
readonly 'point_up': string;
readonly 'point_up_2': string;
readonly 'poland': string;
readonly 'police_car': string;
readonly 'policeman': string;
readonly 'policewoman': string;
readonly 'poodle': string;
readonly 'poop': string;
readonly 'popcorn': string;
readonly 'portugal': string;
readonly 'post_office': string;
readonly 'postal_horn': string;
readonly 'postbox': string;
readonly 'potable_water': string;
readonly 'potato': string;
readonly 'pouch': string;
readonly 'poultry_leg': string;
readonly 'pound': string;
readonly 'pout': string;
readonly 'pouting_cat': string;
readonly 'pouting_man': string;
readonly 'pouting_woman': string;
readonly 'pray': string;
readonly 'prayer_beads': string;
readonly 'pregnant_woman': string;
readonly 'previous_track_button': string;
readonly 'prince': string;
readonly 'princess': string;
readonly 'printer': string;
readonly 'puerto_rico': string;
readonly 'punch': string;
readonly 'purple_heart': string;
readonly 'purse': string;
readonly 'pushpin': string;
readonly 'put_litter_in_its_place': string;
readonly 'qatar': string;
readonly 'question': string;
readonly 'rabbit': string;
readonly 'rabbit2': string;
readonly 'racehorse': string;
readonly 'racing_car': string;
readonly 'radio': string;
readonly 'radio_button': string;
readonly 'radioactive': string;
readonly 'rage': string;
readonly 'rage1': string;
readonly 'rage2': string;
readonly 'rage3': string;
readonly 'rage4': string;
readonly 'railway_car': string;
readonly 'railway_track': string;
readonly 'rainbow': string;
readonly 'rainbow_flag': string;
readonly 'raised_back_of_hand': string;
readonly 'raised_hand': string;
readonly 'raised_hand_with_fingers_splayed': string;
readonly 'raised_hands': string;
readonly 'raising_hand': string;
readonly 'raising_hand_man': string;
readonly 'raising_hand_woman': string;
readonly 'ram': string;
readonly 'ramen': string;
readonly 'rat': string;
readonly 'record_button': string;
readonly 'recycle': string;
readonly 'red_car': string;
readonly 'red_circle': string;
readonly 'registered': string;
readonly 'relaxed': string;
readonly 'relieved': string;
readonly 'reminder_ribbon': string;
readonly 'repeat': string;
readonly 'repeat_one': string;
readonly 'rescue_worker_helmet': string;
readonly 'restroom': string;
readonly 'reunion': string;
readonly 'revolving_hearts': string;
readonly 'rewind': string;
readonly 'rhinoceros': string;
readonly 'ribbon': string;
readonly 'rice': string;
readonly 'rice_ball': string;
readonly 'rice_cracker': string;
readonly 'rice_scene': string;
readonly 'right_anger_bubble': string;
readonly 'ring': string;
readonly 'robot': string;
readonly 'rocket': string;
readonly 'rofl': string;
readonly 'roll_eyes': string;
readonly 'roller_coaster': string;
readonly 'romania': string;
readonly 'rooster': string;
readonly 'rose': string;
readonly 'rosette': string;
readonly 'rotating_light': string;
readonly 'round_pushpin': string;
readonly 'rowboat': string;
readonly 'rowing_man': string;
readonly 'rowing_woman': string;
readonly 'ru': string;
readonly 'rugby_football': string;
readonly 'runner': string;
readonly 'running': string;
readonly 'running_man': string;
readonly 'running_shirt_with_sash': string;
readonly 'running_woman': string;
readonly 'rwanda': string;
readonly 'sa': string;
readonly 'sagittarius': string;
readonly 'sailboat': string;
readonly 'sake': string;
readonly 'samoa': string;
readonly 'san_marino': string;
readonly 'sandal': string;
readonly 'santa': string;
readonly 'sao_tome_principe': string;
readonly 'satellite': string;
readonly 'satisfied': string;
readonly 'saudi_arabia': string;
readonly 'saxophone': string;
readonly 'school': string;
readonly 'school_satchel': string;
readonly 'scissors': string;
readonly 'scorpion': string;
readonly 'scorpius': string;
readonly 'scream': string;
readonly 'scream_cat': string;
readonly 'scroll': string;
readonly 'seat': string;
readonly 'secret': string;
readonly 'see_no_evil': string;
readonly 'seedling': string;
readonly 'selfie': string;
readonly 'senegal': string;
readonly 'serbia': string;
readonly 'seven': string;
readonly 'seychelles': string;
readonly 'shallow_pan_of_food': string;
readonly 'shamrock': string;
readonly 'shark': string;
readonly 'shaved_ice': string;
readonly 'sheep': string;
readonly 'shell': string;
readonly 'shield': string;
readonly 'shinto_shrine': string;
readonly 'ship': string;
readonly 'shipit': string;
readonly 'shirt': string;
readonly 'shit': string;
readonly 'shoe': string;
readonly 'shopping': string;
readonly 'shopping_cart': string;
readonly 'shower': string;
readonly 'shrimp': string;
readonly 'sierra_leone': string;
readonly 'signal_strength': string;
readonly 'singapore': string;
readonly 'sint_maarten': string;
readonly 'six': string;
readonly 'six_pointed_star': string;
readonly 'ski': string;
readonly 'skier': string;
readonly 'skull': string;
readonly 'skull_and_crossbones': string;
readonly 'sleeping': string;
readonly 'sleeping_bed': string;
readonly 'sleepy': string;
readonly 'slightly_frowning_face': string;
readonly 'slightly_smiling_face': string;
readonly 'slot_machine': string;
readonly 'slovakia': string;
readonly 'slovenia': string;
readonly 'small_airplane': string;
readonly 'small_blue_diamond': string;
readonly 'small_orange_diamond': string;
readonly 'small_red_triangle': string;
readonly 'small_red_triangle_down': string;
readonly 'smile': string;
readonly 'smile_cat': string;
readonly 'smiley': string;
readonly 'smiley_cat': string;
readonly 'smiling_imp': string;
readonly 'smirk': string;
readonly 'smirk_cat': string;
readonly 'smoking': string;
readonly 'snail': string;
readonly 'snake': string;
readonly 'sneezing_face': string;
readonly 'snowboarder': string;
readonly 'snowflake': string;
readonly 'snowman': string;
readonly 'snowman_with_snow': string;
readonly 'sob': string;
readonly 'soccer': string;
readonly 'solomon_islands': string;
readonly 'somalia': string;
readonly 'soon': string;
readonly 'sos': string;
readonly 'sound': string;
readonly 'south_africa': string;
readonly 'south_georgia_south_sandwich_islands': string;
readonly 'south_sudan': string;
readonly 'space_invader': string;
readonly 'spades': string;
readonly 'spaghetti': string;
readonly 'sparkle': string;
readonly 'sparkler': string;
readonly 'sparkles': string;
readonly 'sparkling_heart': string;
readonly 'speak_no_evil': string;
readonly 'speaker': string;
readonly 'speaking_head': string;
readonly 'speech_balloon': string;
readonly 'speedboat': string;
readonly 'spider': string;
readonly 'spider_web': string;
readonly 'spiral_calendar': string;
readonly 'spiral_notepad': string;
readonly 'spoon': string;
readonly 'squid': string;
readonly 'squirrel': string;
readonly 'sri_lanka': string;
readonly 'st_barthelemy': string;
readonly 'st_helena': string;
readonly 'st_kitts_nevis': string;
readonly 'st_lucia': string;
readonly 'st_pierre_miquelon': string;
readonly 'st_vincent_grenadines': string;
readonly 'stadium': string;
readonly 'star': string;
readonly 'star2': string;
readonly 'star_and_crescent': string;
readonly 'star_of_david': string;
readonly 'stars': string;
readonly 'station': string;
readonly 'statue_of_liberty': string;
readonly 'steam_locomotive': string;
readonly 'stew': string;
readonly 'stop_button': string;
readonly 'stop_sign': string;
readonly 'stopwatch': string;
readonly 'straight_ruler': string;
readonly 'strawberry': string;
readonly 'stuck_out_tongue': string;
readonly 'stuck_out_tongue_closed_eyes': string;
readonly 'stuck_out_tongue_winking_eye': string;
readonly 'studio_microphone': string;
readonly 'stuffed_flatbread': string;
readonly 'sudan': string;
readonly 'sun_behind_large_cloud': string;
readonly 'sun_behind_rain_cloud': string;
readonly 'sun_behind_small_cloud': string;
readonly 'sun_with_face': string;
readonly 'sunflower': string;
readonly 'sunglasses': string;
readonly 'sunny': string;
readonly 'sunrise': string;
readonly 'sunrise_over_mountains': string;
readonly 'surfer': string;
readonly 'surfing_man': string;
readonly 'surfing_woman': string;
readonly 'suriname': string;
readonly 'sushi': string;
readonly 'suspect': string;
readonly 'suspension_railway': string;
readonly 'swaziland': string;
readonly 'sweat': string;
readonly 'sweat_drops': string;
readonly 'sweat_smile': string;
readonly 'sweden': string;
readonly 'sweet_potato': string;
readonly 'swimmer': string;
readonly 'swimming_man': string;
readonly 'swimming_woman': string;
readonly 'switzerland': string;
readonly 'symbols': string;
readonly 'synagogue': string;
readonly 'syria': string;
readonly 'syringe': string;
readonly 'taco': string;
readonly 'tada': string;
readonly 'taiwan': string;
readonly 'tajikistan': string;
readonly 'tanabata_tree': string;
readonly 'tangerine': string;
readonly 'tanzania': string;
readonly 'taurus': string;
readonly 'taxi': string;
readonly 'tea': string;
readonly 'telephone': string;
readonly 'telephone_receiver': string;
readonly 'telescope': string;
readonly 'tennis': string;
readonly 'tent': string;
readonly 'thailand': string;
readonly 'thermometer': string;
readonly 'thinking': string;
readonly 'thought_balloon': string;
readonly 'three': string;
readonly 'thumbsdown': string;
readonly 'thumbsup': string;
readonly 'ticket': string;
readonly 'tickets': string;
readonly 'tiger': string;
readonly 'tiger2': string;
readonly 'timer_clock': string;
readonly 'timor_leste': string;
readonly 'tipping_hand_man': string;
readonly 'tipping_hand_woman': string;
readonly 'tired_face': string;
readonly 'tm': string;
readonly 'togo': string;
readonly 'toilet': string;
readonly 'tokelau': string;
readonly 'tokyo_tower': string;
readonly 'tomato': string;
readonly 'tonga': string;
readonly 'tongue': string;
readonly 'top': string;
readonly 'tophat': string;
readonly 'tornado': string;
readonly 'tr': string;
readonly 'trackball': string;
readonly 'tractor': string;
readonly 'traffic_light': string;
readonly 'train': string;
readonly 'train2': string;
readonly 'tram': string;
readonly 'triangular_flag_on_post': string;
readonly 'triangular_ruler': string;
readonly 'trident': string;
readonly 'trinidad_tobago': string;
readonly 'triumph': string;
readonly 'trolleybus': string;
readonly 'trollface': string;
readonly 'trophy': string;
readonly 'tropical_drink': string;
readonly 'tropical_fish': string;
readonly 'truck': string;
readonly 'trumpet': string;
readonly 'tshirt': string;
readonly 'tulip': string;
readonly 'tumbler_glass': string;
readonly 'tunisia': string;
readonly 'turkey': string;
readonly 'turkmenistan': string;
readonly 'turks_caicos_islands': string;
readonly 'turtle': string;
readonly 'tuvalu': string;
readonly 'tv': string;
readonly 'twisted_rightwards_arrows': string;
readonly 'two': string;
readonly 'two_hearts': string;
readonly 'two_men_holding_hands': string;
readonly 'two_women_holding_hands': string;
readonly 'u5272': string;
readonly 'u5408': string;
readonly 'u55b6': string;
readonly 'u6307': string;
readonly 'u6708': string;
readonly 'u6709': string;
readonly 'u6e80': string;
readonly 'u7121': string;
readonly 'u7533': string;
readonly 'u7981': string;
readonly 'u7a7a': string;
readonly 'uganda': string;
readonly 'uk': string;
readonly 'ukraine': string;
readonly 'umbrella': string;
readonly 'unamused': string;
readonly 'underage': string;
readonly 'unicorn': string;
readonly 'united_arab_emirates': string;
readonly 'unlock': string;
readonly 'up': string;
readonly 'upside_down_face': string;
readonly 'uruguay': string;
readonly 'us': string;
readonly 'us_virgin_islands': string;
readonly 'uzbekistan': string;
readonly 'v': string;
readonly 'vanuatu': string;
readonly 'vatican_city': string;
readonly 'venezuela': string;
readonly 'vertical_traffic_light': string;
readonly 'vhs': string;
readonly 'vibration_mode': string;
readonly 'video_camera': string;
readonly 'video_game': string;
readonly 'vietnam': string;
readonly 'violin': string;
readonly 'virgo': string;
readonly 'volcano': string;
readonly 'volleyball': string;
readonly 'vs': string;
readonly 'vulcan_salute': string;
readonly 'walking': string;
readonly 'walking_man': string;
readonly 'walking_woman': string;
readonly 'wallis_futuna': string;
readonly 'waning_crescent_moon': string;
readonly 'waning_gibbous_moon': string;
readonly 'warning': string;
readonly 'wastebasket': string;
readonly 'watch': string;
readonly 'water_buffalo': string;
readonly 'watermelon': string;
readonly 'wave': string;
readonly 'wavy_dash': string;
readonly 'waxing_crescent_moon': string;
readonly 'waxing_gibbous_moon': string;
readonly 'wc': string;
readonly 'weary': string;
readonly 'wedding': string;
readonly 'weight_lifting_man': string;
readonly 'weight_lifting_woman': string;
readonly 'western_sahara': string;
readonly 'whale': string;
readonly 'whale2': string;
readonly 'wheel_of_dharma': string;
readonly 'wheelchair': string;
readonly 'white_check_mark': string;
readonly 'white_circle': string;
readonly 'white_flag': string;
readonly 'white_flower': string;
readonly 'white_large_square': string;
readonly 'white_medium_small_square': string;
readonly 'white_medium_square': string;
readonly 'white_small_square': string;
readonly 'white_square_button': string;
readonly 'wilted_flower': string;
readonly 'wind_chime': string;
readonly 'wind_face': string;
readonly 'wine_glass': string;
readonly 'wink': string;
readonly 'wolf': string;
readonly 'woman': string;
readonly 'woman_artist': string;
readonly 'woman_astronaut': string;
readonly 'woman_cartwheeling': string;
readonly 'woman_cook': string;
readonly 'woman_facepalming': string;
readonly 'woman_factory_worker': string;
readonly 'woman_farmer': string;
readonly 'woman_firefighter': string;
readonly 'woman_health_worker': string;
readonly 'woman_judge': string;
readonly 'woman_juggling': string;
readonly 'woman_mechanic': string;
readonly 'woman_office_worker': string;
readonly 'woman_pilot': string;
readonly 'woman_playing_handball': string;
readonly 'woman_playing_water_polo': string;
readonly 'woman_scientist': string;
readonly 'woman_shrugging': string;
readonly 'woman_singer': string;
readonly 'woman_student': string;
readonly 'woman_teacher': string;
readonly 'woman_technologist': string;
readonly 'woman_with_turban': string;
readonly 'womans_clothes': string;
readonly 'womans_hat': string;
readonly 'women_wrestling': string;
readonly 'womens': string;
readonly 'world_map': string;
readonly 'worried': string;
readonly 'wrench': string;
readonly 'writing_hand': string;
readonly 'x': string;
readonly 'yellow_heart': string;
readonly 'yemen': string;
readonly 'yen': string;
readonly 'yin_yang': string;
readonly 'yum': string;
readonly 'zambia': string;
readonly 'zap': string;
readonly 'zero': string;
readonly 'zimbabwe': string;
readonly 'zipper_mouth_face': string;
readonly 'zzz': string; };

export type Event = { readonly 'id': string;
readonly 'type': string;
readonly 'actor': OrganizationSlug2;
readonly 'repo': RepoSlug;
readonly 'payload': { readonly 'member': User;
readonly 'action': string; };
readonly 'public': boolean;
readonly 'created_at': string;
readonly 'org': OrganizationSlug3; };

export type FileContents = { readonly 'filename': string;
readonly 'type': string;
readonly 'language': string;
readonly 'raw_url': string;
readonly 'size': number;
readonly 'truncated': boolean;
readonly 'content': string; };

export type FileSlug = { readonly 'filename': string;
readonly 'type': string;
readonly 'language': string;
readonly 'raw_url': string;
readonly 'size': number; };

export type GitBlob = { readonly 'sha': string;
readonly 'url': string; };

export type GitBranch = { readonly 'name': string;
readonly 'commit': GitBlob; };

export type GitCommit = { readonly 'sha': string;
readonly 'url': string;
readonly 'html_url': string;
readonly 'author': UserSlug;
readonly 'committer': UserSlug;
readonly 'tree': GitBlob;
readonly 'message': string;
readonly 'parents': CommitSlugMaybe[]; };

export type GitPatch = { readonly 'sha': string;
readonly 'filename': string;
readonly 'status': string;
readonly 'additions': number;
readonly 'deletions': number;
readonly 'changes': number;
readonly 'blob_url': string;
readonly 'raw_url': string;
readonly 'contents_url': string;
readonly 'patch': string; };

export type GitRef = { readonly 'ref': string;
readonly 'url': string;
readonly 'object': { readonly 'sha': string;
readonly 'type': string;
readonly 'url': string; }; };

export type Issue = { readonly 'url': string;
readonly 'repository_url': string;
readonly 'labels_url': string;
readonly 'comments_url': string;
readonly 'events_url': string;
readonly 'html_url': string;
readonly 'id': number;
readonly 'number': number;
readonly 'title': string;
readonly 'user': User;
readonly 'labels': any[];
readonly 'state': string;
readonly 'locked': boolean;
readonly 'assignee'?: any;
readonly 'assignees': any[];
readonly 'milestone'?: any;
readonly 'comments': number;
readonly 'created_at': string;
readonly 'updated_at': string;
readonly 'closed_at': string;
readonly 'body'?: any;
readonly 'closed_by': User; };

export type IssueComment = { readonly 'url': string;
readonly 'html_url': string;
readonly 'issue_url': string;
readonly 'id': number;
readonly 'user': User;
readonly 'created_at': string;
readonly 'updated_at': string;
readonly 'body': string; };

export type IssueLabel = { readonly 'id': number;
readonly 'url': string;
readonly 'name': string;
readonly 'color': string;
readonly 'default': boolean; };

export type Organization = { readonly 'login': string;
readonly 'id': number;
readonly 'url': string;
readonly 'repos_url': string;
readonly 'events_url': string;
readonly 'hooks_url': string;
readonly 'issues_url': string;
readonly 'members_url': string;
readonly 'public_members_url': string;
readonly 'avatar_url': string;
readonly 'description'?: any;
readonly 'has_organization_projects': boolean;
readonly 'has_repository_projects': boolean;
readonly 'public_repos': number;
readonly 'public_gists': number;
readonly 'followers': number;
readonly 'following': number;
readonly 'html_url': string;
readonly 'created_at': string;
readonly 'updated_at': string;
readonly 'type': string;
readonly 'total_private_repos': number;
readonly 'owned_private_repos': number;
readonly 'private_gists': number;
readonly 'disk_usage': number;
readonly 'collaborators': number;
readonly 'billing_email': string;
readonly 'plan': { readonly 'name': string;
readonly 'space': number;
readonly 'private_repos': number;
readonly 'filled_seats': number;
readonly 'seats': number; };
readonly 'default_repository_permission': string;
readonly 'members_can_create_repositories'?: any; };

export type OrganizationSlug = { readonly 'login': string;
readonly 'id': number;
readonly 'url': string;
readonly 'repos_url': string;
readonly 'events_url': string;
readonly 'hooks_url': string;
readonly 'issues_url': string;
readonly 'members_url': string;
readonly 'public_members_url': string;
readonly 'avatar_url': string;
readonly 'description': string; };

export type OrganizationSlug2 = { readonly 'id': number;
readonly 'login': string;
readonly 'display_login': string;
readonly 'gravatar_id': string;
readonly 'url': string;
readonly 'avatar_url': string; };

export type OrganizationSlug3 = { readonly 'id': number;
readonly 'login': string;
readonly 'gravatar_id': string;
readonly 'url': string;
readonly 'avatar_url': string; };

export type PullRequest = { readonly 'url': string;
readonly 'repository_url': string;
readonly 'labels_url': string;
readonly 'comments_url': string;
readonly 'events_url': string;
readonly 'html_url': string;
readonly 'id': number;
readonly 'number': number;
readonly 'title': string;
readonly 'user': User;
readonly 'labels': any[];
readonly 'state': string;
readonly 'locked': boolean;
readonly 'assignee'?: any;
readonly 'assignees': any[];
readonly 'milestone'?: any;
readonly 'comments': number;
readonly 'created_at': string;
readonly 'updated_at': string;
readonly 'closed_at'?: any;
readonly 'pull_request': CommitDiffSlug;
readonly 'body': string; };

export type RepoComment = { readonly 'url': string;
readonly 'html_url': string;
readonly 'id': number;
readonly 'user': User;
readonly 'position': number;
readonly 'line': number;
readonly 'path': string;
readonly 'commit_id': string;
readonly 'created_at': string;
readonly 'updated_at': string;
readonly 'body': string; };

export type RepoCommit = { readonly 'sha': string;
readonly 'commit': GitCommit;
readonly 'url': string;
readonly 'html_url': string;
readonly 'comments_url': string;
readonly 'author': User;
readonly 'committer': User;
readonly 'parents': CommitSlugMaybe[];
readonly 'stats': { readonly 'total': number;
readonly 'additions': number;
readonly 'deletions': number; };
readonly 'files': GitPatch[]; };

export type RepoCommitMaybe = { readonly 'sha': string;
readonly 'commit': GitCommit;
readonly 'url': string;
readonly 'html_url': string;
readonly 'comments_url': string;
readonly 'author': User;
readonly 'committer': User;
readonly 'parents': CommitSlugMaybe[]; };

export type RepoFileContents = { readonly 'name': string;
readonly 'path': string;
readonly 'sha': string;
readonly 'size': number;
readonly 'url': string;
readonly 'html_url': string;
readonly 'git_url': string;
readonly 'download_url': string;
readonly 'type': string;
readonly 'content': string;
readonly 'encoding': string;
readonly '_links': { readonly 'self': string;
readonly 'git': string;
readonly 'html': string; }; };

export type RepoSlug = { readonly 'id': number;
readonly 'name': string;
readonly 'url': string; };

export type RepoSubscription = { readonly 'subscribed': boolean;
readonly 'ignored': boolean;
readonly 'reason'?: any;
readonly 'created_at': string;
readonly 'url': string;
readonly 'repository_url': string; };

export type Repository = { readonly 'id': number;
readonly 'name': string;
readonly 'full_name': string;
readonly 'owner': User;
readonly 'private': boolean;
readonly 'html_url': string;
readonly 'description': string;
readonly 'fork': boolean;
readonly 'url': string;
readonly 'forks_url': string;
readonly 'keys_url': string;
readonly 'collaborators_url': string;
readonly 'teams_url': string;
readonly 'hooks_url': string;
readonly 'issue_events_url': string;
readonly 'events_url': string;
readonly 'assignees_url': string;
readonly 'branches_url': string;
readonly 'tags_url': string;
readonly 'blobs_url': string;
readonly 'git_tags_url': string;
readonly 'git_refs_url': string;
readonly 'trees_url': string;
readonly 'statuses_url': string;
readonly 'languages_url': string;
readonly 'stargazers_url': string;
readonly 'contributors_url': string;
readonly 'subscribers_url': string;
readonly 'subscription_url': string;
readonly 'commits_url': string;
readonly 'git_commits_url': string;
readonly 'comments_url': string;
readonly 'issue_comment_url': string;
readonly 'contents_url': string;
readonly 'compare_url': string;
readonly 'merges_url': string;
readonly 'archive_url': string;
readonly 'downloads_url': string;
readonly 'issues_url': string;
readonly 'pulls_url': string;
readonly 'milestones_url': string;
readonly 'notifications_url': string;
readonly 'labels_url': string;
readonly 'releases_url': string;
readonly 'deployments_url': string;
readonly 'created_at': string;
readonly 'updated_at': string;
readonly 'pushed_at': string;
readonly 'git_url': string;
readonly 'ssh_url': string;
readonly 'clone_url': string;
readonly 'svn_url': string;
readonly 'homepage'?: any;
readonly 'size': number;
readonly 'stargazers_count': number;
readonly 'watchers_count': number;
readonly 'language': string;
readonly 'has_issues': boolean;
readonly 'has_projects': boolean;
readonly 'has_downloads': boolean;
readonly 'has_wiki': boolean;
readonly 'has_pages': boolean;
readonly 'forks_count': number;
readonly 'mirror_url'?: any;
readonly 'open_issues_count': number;
readonly 'forks': number;
readonly 'open_issues': number;
readonly 'watchers': number;
readonly 'default_branch': string;
readonly 'permissions': { readonly 'admin': boolean;
readonly 'push': boolean;
readonly 'pull': boolean; }; };

export type SearchResult<T> = { readonly 'total_count': number;
readonly 'incomplete_results': boolean;
readonly 'items': T[]; };

export type User = { readonly 'login': string;
readonly 'id': number;
readonly 'avatar_url': string;
readonly 'gravatar_id': string;
readonly 'url': string;
readonly 'html_url': string;
readonly 'followers_url': string;
readonly 'following_url': string;
readonly 'gists_url': string;
readonly 'starred_url': string;
readonly 'subscriptions_url': string;
readonly 'organizations_url': string;
readonly 'repos_url': string;
readonly 'events_url': string;
readonly 'received_events_url': string;
readonly 'type': "user" | "org";
readonly 'name': string;
readonly 'site_admin': boolean; };

export type UserSlug = { readonly 'name': string;
readonly 'email': string;
readonly 'date': string; };


  // Input Param Types
  export type OctokatApplicationsGrantsFnGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatApplicationsGrantsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatAuthorizationsFnPatchParams = & ParamScopes
& ParamNote
& ParamNoteUrl
& ParamFingerprint & { add_scopes?: String[];
remove_scopes?: String[]; }
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
export type OctokatReposIssuesFnAssigneesPostParams =  & { assignees: String[]; }
export type OctokatReposIssuesFnAssigneesDeleteParams = & ParamAssignees & {  }
export type OctokatReposIssuesFnCommentsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnCommentsPostParams = & ParamBody & {  }
export type OctokatReposIssuesFnEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnLabelsFnDeleteParams =  & { name: String; }
export type OctokatReposIssuesFnLabelsPostParams =  & { labels: String[]; }
export type OctokatReposIssuesFnLabelsPutParams =  & { labels: String[]; }
export type OctokatReposIssuesFnTimelineGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesFnReactionsGetParams =  & { content?: String; }
export type OctokatReposIssuesFnReactionsPostParams =  & { content: String; }
export type OctokatReposIssuesFnPatchParams = & ParamAssignees & { title?: String;
body?: String;
assignee?: String;
state?: String;
milestone?: Number;
labels?: String[]; }
export type OctokatReposIssuesEventsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposIssuesCommentsFnReactionsGetParams =  & { content?: String; }
export type OctokatReposIssuesCommentsFnReactionsPostParams =  & { content: String; }
export type OctokatReposIssuesCommentsFnPatchParams = & ParamBody & {  }
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
export type OctokatReposLabelsFnPatchParams = & ParamColor & { name: String; }
export type OctokatReposLabelsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposLabelsPostParams = & ParamName
& ParamColor & {  }
export type OctokatReposMilestonesFnPatchParams = & ParamState
& ParamDescription & { title: String;
due_on?: Date; }
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
export type OctokatReposPullsFnCommitsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnFilesGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnMergeGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnMergePutParams =  & { commit_title?: String;
commit_message?: String;
sha?: String;
merge_method?: String; }
export type OctokatReposPullsFnReviewsFnCommentsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnReviewsFnEventsPostParams =  & { body?: String;
event?: String; }
export type OctokatReposPullsFnReviewsFnDismissalsPutParams = & ParamPage
& ParamPerPage & { message?: String; }
export type OctokatReposPullsFnReviewsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnReviewsPostParams =  & { body?: String;
event?: String;
comments?: String[];
path?: String;
position?: Number; }
export type OctokatReposPullsFnCommentsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnCommentsPostParams = & ParamBody & { in_reply_to: Number; }
export type OctokatReposPullsFnRequestedReviewersGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposPullsFnRequestedReviewersPostParams =  & { reviewers?: String[]; }
export type OctokatReposPullsFnRequestedReviewersDeleteParams =  & { reviewers?: String[]; }
export type OctokatReposPullsFnPatchParams = & ParamState & { title?: String;
body?: String;
base?: String; }
export type OctokatReposPullsCommentsFnReactionsGetParams =  & { content?: String; }
export type OctokatReposPullsCommentsFnReactionsPostParams =  & { content: String; }
export type OctokatReposPullsCommentsFnPatchParams = & ParamBody & {  }
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
export type OctokatReposCommentsFnReactionsGetParams =  & { content?: String; }
export type OctokatReposCommentsFnReactionsPostParams =  & { content: String; }
export type OctokatReposCommentsFnPatchParams = & ParamBody & {  }
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
export type OctokatReposKeysGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposKeysPostParams = & ParamTitle
& ParamKey & { read_only?: Boolean; }
export type OctokatReposDeploymentsFnStatusesPostParams =  & { state?: String;
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
export type OctokatReposDownloadsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposForksGetParams = & ParamPage
& ParamPerPage & { sort?: String; }
export type OctokatReposForksPostParams =  & { organization?: String; }
export type OctokatReposMergesPostParams = & ParamBase
& ParamHead & { commit_message?: String; }
export type OctokatReposPagesBuildsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposPagesGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatReposReleasesFnAssetsPostParams =  & { filePath: String;
name: String;
label?: String; }
export type OctokatReposReleasesFnPatchParams =  & { tag_name: String;
target_commitish?: String;
name?: String;
body?: String;
draft?: Boolean;
prerelease?: Boolean; }
export type OctokatReposReleasesTagsGetParams =  & { tag: String; }
export type OctokatReposReleasesAssetsPatchParams = & ParamName & { label?: String; }
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
export type OctokatReposHooksFnPatchParams = & ParamName & { config: Object;
events?: String[];
add_events?: String[];
remove_events?: String[];
active?: Boolean; }
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
export type OctokatOrgsMigrationsFnReposLockDeleteParams =  & { repo_name: String; }
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
export type OctokatOrgsHooksFnPatchParams =  & { config: Object;
events?: String[];
active?: Boolean; }
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
export type OctokatNotificationsThreadsSubscriptionPutParams =  & { subscribed?: Boolean;
ignored?: Boolean; }
export type OctokatNotificationsGetParams = & ParamSince & { all?: Boolean;
participating?: Boolean;
before?: String; }
export type OctokatNotificationsPutParams =  & { last_read_at?: String; }
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
export type OctokatUserKeysGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatUserKeysPostParams = & ParamTitle
& ParamKey & {  }
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
export type OctokatGistsFnForksGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatGistsFnCommentsFnPatchParams = & ParamBody & {  }
export type OctokatGistsFnCommentsPostParams = & ParamBody & {  }
export type OctokatGistsFnPatchParams = & ParamDescription
& ParamFiles & { content?: String;
filename?: String; }
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
export type OctokatTeamsMembersGetParams = & ParamPage
& ParamPerPage & { role?: String; }
export type OctokatTeamsMembershipsPutParams =  & { role?: String; }
export type OctokatTeamsReposFnPutParams = & ParamOrg & { permission?: String; }
export type OctokatTeamsReposGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatTeamsInvitationsGetParams = & ParamPage
& ParamPerPage & {  }
export type OctokatTeamsPatchParams = & ParamName
& ParamPrivacy & { description?: String; }
export type OctokatProjectsFnColumnsPostParams = & ParamName & {  }
export type OctokatProjectsFnPatchParams = & ParamName & { body?: String; }
export type OctokatProjectsColumnsFnCardsGetParams = & ParamColumnId & {  }
export type OctokatProjectsColumnsFnCardsPostParams = & ParamColumnId & { note?: String;
content_id?: String;
content_type?: String; }
export type OctokatProjectsColumnsFnMovesPostParams =  & { position: String; }
export type OctokatProjectsColumnsFnPatchParams = & ParamName & {  }
export type OctokatProjectsColumnsCardsMovesPostParams =  & { position: String;
column_id?: String; }
export type OctokatProjectsColumnsCardsPatchParams =  & { note?: String; }
export type OctokatRepositoriesFnInvitationsFnPatchParams =  & { permission?: String; }
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
export type OctokatAdminPreReceiveEnvironmentsFnPatchParams =  & { name: String;
image_url: String; }
export type OctokatAdminPreReceiveEnvironmentsPostParams =  & { name: String;
image_url: String; }
export type OctokatAdminPreReceiveHooksFnPatchParams =  & { hook: Object; }
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
(client_id: any): { 


// Syntactic shortcut used here
tokens(access_token: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
create(): Promise<any>
remove(): Promise<any>
 }


 }
grants: { 
(id: any): { 


fetch(params?: OctokatApplicationsGrantsFnGetParams): Promise<any>
read(params?: OctokatApplicationsGrantsFnGetParams): Promise<String>
readBinary(params?: OctokatApplicationsGrantsFnGetParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatApplicationsGrantsGetParams): Promise<any>
read(params?: OctokatApplicationsGrantsGetParams): Promise<String>
readBinary(params?: OctokatApplicationsGrantsGetParams): Promise<any>
 }

 }
authorizations: { 
(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatAuthorizationsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

// Syntactic shortcut used here
clients(client_id: any): { 


add(params: OctokatAuthorizationsClientsPutParams): Promise<any>
 }

fetch(params?: OctokatAuthorizationsGetParams): Promise<any>
read(params?: OctokatAuthorizationsGetParams): Promise<String>
readBinary(params?: OctokatAuthorizationsGetParams): Promise<any>
create(params?: OctokatAuthorizationsPostParams): Promise<any>
 }
events: { 


fetch(params?: OctokatEventsGetParams): Promise<any>
read(params?: OctokatEventsGetParams): Promise<String>
readBinary(params?: OctokatEventsGetParams): Promise<any>
 }

// Syntactic shortcut used here
repos(owner: any, repo: any): { 

events: { 


fetch(params?: OctokatReposEventsGetParams): Promise<any>
read(params?: OctokatReposEventsGetParams): Promise<String>
readBinary(params?: OctokatReposEventsGetParams): Promise<any>
 }
issues: { 
(number: any): { 

lock: { 


add(): Promise<any>
remove(): Promise<any>
 }
assignees: { 


create(params: OctokatReposIssuesFnAssigneesPostParams): Promise<any>
remove(params?: OctokatReposIssuesFnAssigneesDeleteParams): Promise<void>
 }
comments: { 


fetch(params?: OctokatReposIssuesFnCommentsGetParams): Promise<SearchResult<IssueComment>>
fetchAll(params?: OctokatReposIssuesFnCommentsGetParams): Promise<IssueComment[]>
read(params?: OctokatReposIssuesFnCommentsGetParams): Promise<String>
readBinary(params?: OctokatReposIssuesFnCommentsGetParams): Promise<any>
create(params?: OctokatReposIssuesFnCommentsPostParams): Promise<IssueComment>
 }
events: { 


fetch(params?: OctokatReposIssuesFnEventsGetParams): Promise<any>
read(params?: OctokatReposIssuesFnEventsGetParams): Promise<String>
readBinary(params?: OctokatReposIssuesFnEventsGetParams): Promise<any>
 }
labels: { 
(name: any): { 


remove(params: OctokatReposIssuesFnLabelsFnDeleteParams): Promise<void>
 }

fetch(): Promise<SearchResult<IssueLabel>>
fetchAll(): Promise<IssueLabel[]>
read(): Promise<String>
readBinary(): Promise<any>
create(params: OctokatReposIssuesFnLabelsPostParams): Promise<IssueLabel>
add(params: OctokatReposIssuesFnLabelsPutParams): Promise<any>
remove(): Promise<any>
 }
timeline: { 


fetch(params?: OctokatReposIssuesFnTimelineGetParams): Promise<any>
read(params?: OctokatReposIssuesFnTimelineGetParams): Promise<String>
readBinary(params?: OctokatReposIssuesFnTimelineGetParams): Promise<any>
 }
reactions: { 


fetch(params?: OctokatReposIssuesFnReactionsGetParams): Promise<any>
read(params?: OctokatReposIssuesFnReactionsGetParams): Promise<String>
readBinary(params?: OctokatReposIssuesFnReactionsGetParams): Promise<any>
create(params: OctokatReposIssuesFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<Issue>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatReposIssuesFnPatchParams): Promise<Issue>
 }
events: { 
(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

fetch(params?: OctokatReposIssuesEventsGetParams): Promise<any>
read(params?: OctokatReposIssuesEventsGetParams): Promise<String>
readBinary(params?: OctokatReposIssuesEventsGetParams): Promise<any>
 }
comments: { 
(id: any): { 

reactions: { 


fetch(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<any>
read(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<String>
readBinary(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<any>
create(params: OctokatReposIssuesCommentsFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<IssueComment>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatReposIssuesCommentsFnPatchParams): Promise<IssueComment>
remove(): Promise<void>
 }

fetch(params?: OctokatReposIssuesCommentsGetParams): Promise<SearchResult<IssueComment>>
fetchAll(params?: OctokatReposIssuesCommentsGetParams): Promise<IssueComment[]>
read(params?: OctokatReposIssuesCommentsGetParams): Promise<String>
readBinary(params?: OctokatReposIssuesCommentsGetParams): Promise<any>
 }
fetch(params?: OctokatReposIssuesGetParams): Promise<any>
read(params?: OctokatReposIssuesGetParams): Promise<String>
readBinary(params?: OctokatReposIssuesGetParams): Promise<any>
create(params: OctokatReposIssuesPostParams): Promise<Issue>
 }
notifications: { 


fetch(params?: OctokatReposNotificationsGetParams): Promise<any>
read(params?: OctokatReposNotificationsGetParams): Promise<String>
readBinary(params?: OctokatReposNotificationsGetParams): Promise<any>
add(params?: OctokatReposNotificationsPutParams): Promise<any>
 }
stargazers: { 


fetch(params?: OctokatReposStargazersGetParams): Promise<any>
read(params?: OctokatReposStargazersGetParams): Promise<String>
readBinary(params?: OctokatReposStargazersGetParams): Promise<any>
 }
subscribers: { 


fetch(params?: OctokatReposSubscribersGetParams): Promise<any>
read(params?: OctokatReposSubscribersGetParams): Promise<String>
readBinary(params?: OctokatReposSubscribersGetParams): Promise<any>
 }
subscription: { 


fetch(params?: OctokatReposSubscriptionGetParams): Promise<any>
read(params?: OctokatReposSubscriptionGetParams): Promise<String>
readBinary(params?: OctokatReposSubscriptionGetParams): Promise<any>
add(params?: OctokatReposSubscriptionPutParams): Promise<any>
remove(): Promise<any>
 }
git: { 

blobs: { 
(sha: any): { 


fetch(params?: OctokatReposGitBlobsFnGetParams): Promise<any>
read(params?: OctokatReposGitBlobsFnGetParams): Promise<String>
readBinary(params?: OctokatReposGitBlobsFnGetParams): Promise<any>
 }

create(params: OctokatReposGitBlobsPostParams): Promise<any>
 }
commits: { 
(sha: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

create(params: OctokatReposGitCommitsPostParams): Promise<any>
 }
refs: { 
(ref: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatReposGitRefsFnPatchParams): Promise<any>
remove(): Promise<any>
 }
tags: { 


fetch(params?: OctokatReposGitRefsTagsGetParams): Promise<any>
read(params?: OctokatReposGitRefsTagsGetParams): Promise<String>
readBinary(params?: OctokatReposGitRefsTagsGetParams): Promise<any>
 }
create(params: OctokatReposGitRefsPostParams): Promise<any>
 }
tags: { 
(sha: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

create(params: OctokatReposGitTagsPostParams): Promise<any>
 }
trees: { 
(sha: any): { 


fetch(params?: OctokatReposGitTreesFnGetParams): Promise<any>
read(params?: OctokatReposGitTreesFnGetParams): Promise<String>
readBinary(params?: OctokatReposGitTreesFnGetParams): Promise<any>
 }

create(params: OctokatReposGitTreesPostParams): Promise<any>
 }

 }
assignees: { 
(assignee: any): { 


fetch(params: OctokatReposAssigneesFnGetParams): Promise<Boolean>
read(params: OctokatReposAssigneesFnGetParams): Promise<String>
readBinary(params: OctokatReposAssigneesFnGetParams): Promise<any>
 }

fetch(): Promise<SearchResult<User>>
fetchAll(): Promise<User[]>
read(): Promise<String>
readBinary(): Promise<any>
 }
labels: { 
(name: any): { 


fetch(): Promise<IssueLabel>
read(): Promise<String>
readBinary(): Promise<any>
update(params: OctokatReposLabelsFnPatchParams): Promise<IssueLabel>
remove(): Promise<void>
 }

fetch(params?: OctokatReposLabelsGetParams): Promise<SearchResult<IssueLabel>>
fetchAll(params?: OctokatReposLabelsGetParams): Promise<IssueLabel[]>
read(params?: OctokatReposLabelsGetParams): Promise<String>
readBinary(params?: OctokatReposLabelsGetParams): Promise<any>
create(params?: OctokatReposLabelsPostParams): Promise<IssueLabel>
 }
milestones: { 
(number: any): { 

labels: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params: OctokatReposMilestonesFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposMilestonesGetParams): Promise<any>
read(params?: OctokatReposMilestonesGetParams): Promise<String>
readBinary(params?: OctokatReposMilestonesGetParams): Promise<any>
create(params: OctokatReposMilestonesPostParams): Promise<any>
 }
import: { 

authors: { 
(author_id: any): { 


update(params: OctokatReposImportAuthorsFnPatchParams): Promise<any>
 }

fetch(params?: OctokatReposImportAuthorsGetParams): Promise<any>
read(params?: OctokatReposImportAuthorsGetParams): Promise<String>
readBinary(params?: OctokatReposImportAuthorsGetParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(): Promise<any>
add(params: OctokatReposImportPutParams): Promise<any>
remove(): Promise<any>
 }
license: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
projects: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
create(params?: OctokatReposProjectsPostParams): Promise<any>
 }
pulls: { 
(number: any): { 

commits: { 


fetch(params?: OctokatReposPullsFnCommitsGetParams): Promise<any>
read(params?: OctokatReposPullsFnCommitsGetParams): Promise<String>
readBinary(params?: OctokatReposPullsFnCommitsGetParams): Promise<any>
 }
files: { 


fetch(params?: OctokatReposPullsFnFilesGetParams): Promise<any>
read(params?: OctokatReposPullsFnFilesGetParams): Promise<String>
readBinary(params?: OctokatReposPullsFnFilesGetParams): Promise<any>
 }
merge: { 


fetch(params?: OctokatReposPullsFnMergeGetParams): Promise<any>
read(params?: OctokatReposPullsFnMergeGetParams): Promise<String>
readBinary(params?: OctokatReposPullsFnMergeGetParams): Promise<any>
add(params?: OctokatReposPullsFnMergePutParams): Promise<any>
 }
reviews: { 
(id: any): { 

comments: { 


fetch(params?: OctokatReposPullsFnReviewsFnCommentsGetParams): Promise<any>
read(params?: OctokatReposPullsFnReviewsFnCommentsGetParams): Promise<String>
readBinary(params?: OctokatReposPullsFnReviewsFnCommentsGetParams): Promise<any>
 }
events: { 


create(params?: OctokatReposPullsFnReviewsFnEventsPostParams): Promise<any>
 }
dismissals: { 


add(params?: OctokatReposPullsFnReviewsFnDismissalsPutParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

fetch(params?: OctokatReposPullsFnReviewsGetParams): Promise<any>
read(params?: OctokatReposPullsFnReviewsGetParams): Promise<String>
readBinary(params?: OctokatReposPullsFnReviewsGetParams): Promise<any>
create(params?: OctokatReposPullsFnReviewsPostParams): Promise<any>
 }
comments: { 


fetch(params?: OctokatReposPullsFnCommentsGetParams): Promise<any>
read(params?: OctokatReposPullsFnCommentsGetParams): Promise<String>
readBinary(params?: OctokatReposPullsFnCommentsGetParams): Promise<any>
create(params: OctokatReposPullsFnCommentsPostParams): Promise<any>
 }
requestedReviewers: { 


fetch(params?: OctokatReposPullsFnRequestedReviewersGetParams): Promise<any>
read(params?: OctokatReposPullsFnRequestedReviewersGetParams): Promise<String>
readBinary(params?: OctokatReposPullsFnRequestedReviewersGetParams): Promise<any>
create(params?: OctokatReposPullsFnRequestedReviewersPostParams): Promise<any>
remove(params?: OctokatReposPullsFnRequestedReviewersDeleteParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatReposPullsFnPatchParams): Promise<any>
 }
comments: { 
(id: any): { 

reactions: { 


fetch(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<any>
read(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<String>
readBinary(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<any>
create(params: OctokatReposPullsCommentsFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatReposPullsCommentsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposPullsCommentsGetParams): Promise<any>
read(params?: OctokatReposPullsCommentsGetParams): Promise<String>
readBinary(params?: OctokatReposPullsCommentsGetParams): Promise<any>
 }
fetch(params?: OctokatReposPullsGetParams): Promise<any>
read(params?: OctokatReposPullsGetParams): Promise<String>
readBinary(params?: OctokatReposPullsGetParams): Promise<any>
create(params: OctokatReposPullsPostParams): Promise<any>
 }
comments: { 
(id: any): { 

reactions: { 


fetch(params?: OctokatReposCommentsFnReactionsGetParams): Promise<any>
read(params?: OctokatReposCommentsFnReactionsGetParams): Promise<String>
readBinary(params?: OctokatReposCommentsFnReactionsGetParams): Promise<any>
create(params: OctokatReposCommentsFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatReposCommentsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposCommentsGetParams): Promise<any>
read(params?: OctokatReposCommentsGetParams): Promise<String>
readBinary(params?: OctokatReposCommentsGetParams): Promise<any>
 }
contributors: { 


fetch(params?: OctokatReposContributorsGetParams): Promise<any>
read(params?: OctokatReposContributorsGetParams): Promise<String>
readBinary(params?: OctokatReposContributorsGetParams): Promise<any>
 }
languages: { 


fetch(params?: OctokatReposLanguagesGetParams): Promise<any>
read(params?: OctokatReposLanguagesGetParams): Promise<String>
readBinary(params?: OctokatReposLanguagesGetParams): Promise<any>
 }
teams: { 


fetch(params?: OctokatReposTeamsGetParams): Promise<any>
read(params?: OctokatReposTeamsGetParams): Promise<String>
readBinary(params?: OctokatReposTeamsGetParams): Promise<any>
 }
tags: { 


fetch(params?: OctokatReposTagsGetParams): Promise<any>
read(params?: OctokatReposTagsGetParams): Promise<String>
readBinary(params?: OctokatReposTagsGetParams): Promise<any>
 }
branches: { 
(branch: any): { 

protection: { 

requiredStatusChecks: { 

contexts: { 


fetch(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsGetParams): Promise<any>
create(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPostParams): Promise<any>
add(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPutParams): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsDeleteParams): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksGetParams): Promise<any>
update(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksPatchParams): Promise<any>
remove(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksDeleteParams): Promise<any>
 }
requiredPullRequestReviews: { 


fetch(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsGetParams): Promise<any>
update(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsPatchParams): Promise<any>
remove(): Promise<any>
 }
restrictions: { 

teams: { 


fetch(params?: OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRestrictionsTeamsGetParams): Promise<any>
create(params: OctokatReposBranchesFnProtectionRestrictionsTeamsPostParams): Promise<any>
add(params: OctokatReposBranchesFnProtectionRestrictionsTeamsPutParams): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRestrictionsTeamsDeleteParams): Promise<any>
 }
users: { 


fetch(params?: OctokatReposBranchesFnProtectionRestrictionsUsersGetParams): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRestrictionsUsersGetParams): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRestrictionsUsersGetParams): Promise<any>
create(params: OctokatReposBranchesFnProtectionRestrictionsUsersPostParams): Promise<any>
add(params: OctokatReposBranchesFnProtectionRestrictionsUsersPutParams): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRestrictionsUsersDeleteParams): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnProtectionRestrictionsGetParams): Promise<any>
read(params?: OctokatReposBranchesFnProtectionRestrictionsGetParams): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionRestrictionsGetParams): Promise<any>
remove(): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnProtectionGetParams): Promise<any>
read(params?: OctokatReposBranchesFnProtectionGetParams): Promise<String>
readBinary(params?: OctokatReposBranchesFnProtectionGetParams): Promise<any>
add(params: OctokatReposBranchesFnProtectionPutParams): Promise<any>
remove(params?: OctokatReposBranchesFnProtectionDeleteParams): Promise<any>
 }
fetch(params?: OctokatReposBranchesFnGetParams): Promise<any>
read(params?: OctokatReposBranchesFnGetParams): Promise<String>
readBinary(params?: OctokatReposBranchesFnGetParams): Promise<any>
 }

fetch(params?: OctokatReposBranchesGetParams): Promise<any>
read(params?: OctokatReposBranchesGetParams): Promise<String>
readBinary(params?: OctokatReposBranchesGetParams): Promise<any>
 }
collaborators: { 
(username: any): { 

permission: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
add(params?: OctokatReposCollaboratorsFnPutParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposCollaboratorsGetParams): Promise<any>
read(params?: OctokatReposCollaboratorsGetParams): Promise<String>
readBinary(params?: OctokatReposCollaboratorsGetParams): Promise<any>
 }
commits: { 
(ref: any): { 

comments: { 


fetch(params: OctokatReposCommitsFnCommentsGetParams): Promise<any>
read(params: OctokatReposCommitsFnCommentsGetParams): Promise<String>
readBinary(params: OctokatReposCommitsFnCommentsGetParams): Promise<any>
 }
statuses: { 


fetch(params: OctokatReposCommitsFnStatusesGetParams): Promise<any>
read(params: OctokatReposCommitsFnStatusesGetParams): Promise<String>
readBinary(params: OctokatReposCommitsFnStatusesGetParams): Promise<any>
 }
status: { 


fetch(params: OctokatReposCommitsFnStatusGetParams): Promise<any>
read(params: OctokatReposCommitsFnStatusGetParams): Promise<String>
readBinary(params: OctokatReposCommitsFnStatusGetParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

fetch(params?: OctokatReposCommitsGetParams): Promise<any>
read(params?: OctokatReposCommitsGetParams): Promise<String>
readBinary(params?: OctokatReposCommitsGetParams): Promise<any>
 }

// Syntactic shortcut used here
compare(base: any, head: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

readme: { 


fetch(params?: OctokatReposReadmeGetParams): Promise<any>
read(params?: OctokatReposReadmeGetParams): Promise<String>
readBinary(params?: OctokatReposReadmeGetParams): Promise<any>
 }

// Syntactic shortcut used here
contents(path: any): { 


fetch(params: OctokatReposContentsGetParams): Promise<any>
read(params: OctokatReposContentsGetParams): Promise<String>
readBinary(params: OctokatReposContentsGetParams): Promise<any>
add(params: OctokatReposContentsPutParams): Promise<any>
remove(params: OctokatReposContentsDeleteParams): Promise<any>
 }


// Syntactic shortcut used here
tarball(ref: any): { 


fetch(params?: OctokatReposTarballGetParams): Promise<any>
read(params?: OctokatReposTarballGetParams): Promise<String>
readBinary(params?: OctokatReposTarballGetParams): Promise<any>
 }


// Syntactic shortcut used here
zipball(ref: any): { 


fetch(params?: OctokatReposZipballGetParams): Promise<any>
read(params?: OctokatReposZipballGetParams): Promise<String>
readBinary(params?: OctokatReposZipballGetParams): Promise<any>
 }

keys: { 
(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposKeysGetParams): Promise<any>
read(params?: OctokatReposKeysGetParams): Promise<String>
readBinary(params?: OctokatReposKeysGetParams): Promise<any>
create(params?: OctokatReposKeysPostParams): Promise<any>
 }
deployments: { 
(id: any): { 

statuses: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
create(params?: OctokatReposDeploymentsFnStatusesPostParams): Promise<any>
 }

 }

fetch(params?: OctokatReposDeploymentsGetParams): Promise<any>
read(params?: OctokatReposDeploymentsGetParams): Promise<String>
readBinary(params?: OctokatReposDeploymentsGetParams): Promise<any>
create(params: OctokatReposDeploymentsPostParams): Promise<any>
 }
downloads: { 
(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposDownloadsGetParams): Promise<any>
read(params?: OctokatReposDownloadsGetParams): Promise<String>
readBinary(params?: OctokatReposDownloadsGetParams): Promise<any>
 }
forks: { 


fetch(params?: OctokatReposForksGetParams): Promise<any>
read(params?: OctokatReposForksGetParams): Promise<String>
readBinary(params?: OctokatReposForksGetParams): Promise<any>
create(params?: OctokatReposForksPostParams): Promise<any>
 }
merges: { 


create(params?: OctokatReposMergesPostParams): Promise<any>
 }
pages: { 

builds: { 
(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
latest: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
fetch(params?: OctokatReposPagesBuildsGetParams): Promise<any>
read(params?: OctokatReposPagesBuildsGetParams): Promise<String>
readBinary(params?: OctokatReposPagesBuildsGetParams): Promise<any>
create(): Promise<any>
 }
fetch(params?: OctokatReposPagesGetParams): Promise<any>
read(params?: OctokatReposPagesGetParams): Promise<String>
readBinary(params?: OctokatReposPagesGetParams): Promise<any>
 }
releases: { 
(id: any): { 

assets: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
create(params: OctokatReposReleasesFnAssetsPostParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params: OctokatReposReleasesFnPatchParams): Promise<any>
remove(): Promise<any>
 }
latest: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
tags(tag: any): { 


fetch(params: OctokatReposReleasesTagsGetParams): Promise<any>
read(params: OctokatReposReleasesTagsGetParams): Promise<String>
readBinary(params: OctokatReposReleasesTagsGetParams): Promise<any>
 }


// Syntactic shortcut used here
assets(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatReposReleasesAssetsPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposReleasesGetParams): Promise<any>
read(params?: OctokatReposReleasesGetParams): Promise<String>
readBinary(params?: OctokatReposReleasesGetParams): Promise<any>
create(params: OctokatReposReleasesPostParams): Promise<any>
 }
stats: { 

contributors: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
commitActivity: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
codeFrequency: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
participation: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
punchCard: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

 }

// Syntactic shortcut used here
statuses(sha: any): { 


create(params: OctokatReposStatusesPostParams): Promise<any>
 }

traffic: { 

popular: { 

referrers: { 


fetch(params?: OctokatReposTrafficPopularReferrersGetParams): Promise<any>
read(params?: OctokatReposTrafficPopularReferrersGetParams): Promise<String>
readBinary(params?: OctokatReposTrafficPopularReferrersGetParams): Promise<any>
 }
paths: { 


fetch(params?: OctokatReposTrafficPopularPathsGetParams): Promise<any>
read(params?: OctokatReposTrafficPopularPathsGetParams): Promise<String>
readBinary(params?: OctokatReposTrafficPopularPathsGetParams): Promise<any>
 }

 }
views: { 


fetch(params?: OctokatReposTrafficViewsGetParams): Promise<any>
read(params?: OctokatReposTrafficViewsGetParams): Promise<String>
readBinary(params?: OctokatReposTrafficViewsGetParams): Promise<any>
 }
clones: { 


fetch(params?: OctokatReposTrafficClonesGetParams): Promise<any>
read(params?: OctokatReposTrafficClonesGetParams): Promise<String>
readBinary(params?: OctokatReposTrafficClonesGetParams): Promise<any>
 }

 }
hooks: { 
(id: any): { 

tests: { 


create(): Promise<any>
 }
pings: { 


create(): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params: OctokatReposHooksFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposHooksGetParams): Promise<any>
read(params?: OctokatReposHooksGetParams): Promise<String>
readBinary(params?: OctokatReposHooksGetParams): Promise<any>
create(params: OctokatReposHooksPostParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatReposPatchParams): Promise<any>
remove(): Promise<any>
 }


// Syntactic shortcut used here
networks(owner: any, repo: any): { 

events: { 


fetch(params?: OctokatNetworksEventsGetParams): Promise<any>
read(params?: OctokatNetworksEventsGetParams): Promise<String>
readBinary(params?: OctokatNetworksEventsGetParams): Promise<any>
 }

 }


// Syntactic shortcut used here
orgs(org: any): { 

events: { 


fetch(params?: OctokatOrgsEventsGetParams): Promise<any>
read(params?: OctokatOrgsEventsGetParams): Promise<String>
readBinary(params?: OctokatOrgsEventsGetParams): Promise<any>
 }
issues: { 


fetch(params?: OctokatOrgsIssuesGetParams): Promise<any>
read(params?: OctokatOrgsIssuesGetParams): Promise<String>
readBinary(params?: OctokatOrgsIssuesGetParams): Promise<any>
 }
migrations: { 
(id: any): { 

archive: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
remove(): Promise<any>
 }

// Syntactic shortcut used here
repos(repo_name: any): { 

lock: { 


remove(params: OctokatOrgsMigrationsFnReposLockDeleteParams): Promise<any>
 }

 }

fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

fetch(params?: OctokatOrgsMigrationsGetParams): Promise<any>
read(params?: OctokatOrgsMigrationsGetParams): Promise<String>
readBinary(params?: OctokatOrgsMigrationsGetParams): Promise<any>
create(params: OctokatOrgsMigrationsPostParams): Promise<any>
 }
members: { 
(username: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatOrgsMembersGetParams): Promise<any>
read(params?: OctokatOrgsMembersGetParams): Promise<String>
readBinary(params?: OctokatOrgsMembersGetParams): Promise<any>
 }
publicMembers: { 
(username: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
memberships(username: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
add(params: OctokatOrgsMembershipsPutParams): Promise<any>
remove(): Promise<any>
 }

invitations: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
outsideCollaborators: { 


fetch(params?: OctokatOrgsOutsideCollaboratorsGetParams): Promise<any>
read(params?: OctokatOrgsOutsideCollaboratorsGetParams): Promise<String>
readBinary(params?: OctokatOrgsOutsideCollaboratorsGetParams): Promise<any>
 }

// Syntactic shortcut used here
outsideCollaborator(username: any): { 


add(): Promise<any>
remove(): Promise<any>
 }

teams: { 


fetch(params?: OctokatOrgsTeamsGetParams): Promise<any>
read(params?: OctokatOrgsTeamsGetParams): Promise<String>
readBinary(params?: OctokatOrgsTeamsGetParams): Promise<any>
create(params?: OctokatOrgsTeamsPostParams): Promise<any>
 }
hooks: { 
(id: any): { 

pings: { 


create(): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params: OctokatOrgsHooksFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatOrgsHooksGetParams): Promise<any>
read(params?: OctokatOrgsHooksGetParams): Promise<String>
readBinary(params?: OctokatOrgsHooksGetParams): Promise<any>
create(params: OctokatOrgsHooksPostParams): Promise<any>
 }
blocks: { 
(username: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatOrgsBlocksGetParams): Promise<any>
read(params?: OctokatOrgsBlocksGetParams): Promise<String>
readBinary(params?: OctokatOrgsBlocksGetParams): Promise<any>
 }
projects: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
create(params?: OctokatOrgsProjectsPostParams): Promise<any>
 }
repos: { 


fetch(params?: OctokatOrgsReposGetParams): Promise<any>
read(params?: OctokatOrgsReposGetParams): Promise<String>
readBinary(params?: OctokatOrgsReposGetParams): Promise<any>
create(params?: OctokatOrgsReposPostParams): Promise<any>
 }
fetch(params?: OctokatOrgsGetParams): Promise<any>
read(params?: OctokatOrgsGetParams): Promise<String>
readBinary(params?: OctokatOrgsGetParams): Promise<any>
update(params?: OctokatOrgsPatchParams): Promise<any>
 }

users: { 
(username: any): { 

receivedEvents: { 

public: { 


fetch(params?: OctokatUsersFnReceivedEventsPublicGetParams): Promise<any>
read(params?: OctokatUsersFnReceivedEventsPublicGetParams): Promise<String>
readBinary(params?: OctokatUsersFnReceivedEventsPublicGetParams): Promise<any>
 }
fetch(params?: OctokatUsersFnReceivedEventsGetParams): Promise<any>
read(params?: OctokatUsersFnReceivedEventsGetParams): Promise<String>
readBinary(params?: OctokatUsersFnReceivedEventsGetParams): Promise<any>
 }
events: { 

public: { 


fetch(params?: OctokatUsersFnEventsPublicGetParams): Promise<any>
read(params?: OctokatUsersFnEventsPublicGetParams): Promise<String>
readBinary(params?: OctokatUsersFnEventsPublicGetParams): Promise<any>
 }

// Syntactic shortcut used here
orgs(org: any): { 


fetch(params?: OctokatUsersFnEventsOrgsGetParams): Promise<any>
read(params?: OctokatUsersFnEventsOrgsGetParams): Promise<String>
readBinary(params?: OctokatUsersFnEventsOrgsGetParams): Promise<any>
 }

fetch(params?: OctokatUsersFnEventsGetParams): Promise<any>
read(params?: OctokatUsersFnEventsGetParams): Promise<String>
readBinary(params?: OctokatUsersFnEventsGetParams): Promise<any>
 }
starred: { 


fetch(params?: OctokatUsersFnStarredGetParams): Promise<any>
read(params?: OctokatUsersFnStarredGetParams): Promise<String>
readBinary(params?: OctokatUsersFnStarredGetParams): Promise<any>
 }
subscriptions: { 


fetch(params?: OctokatUsersFnSubscriptionsGetParams): Promise<any>
read(params?: OctokatUsersFnSubscriptionsGetParams): Promise<String>
readBinary(params?: OctokatUsersFnSubscriptionsGetParams): Promise<any>
 }
gists: { 


fetch(params?: OctokatUsersFnGistsGetParams): Promise<any>
read(params?: OctokatUsersFnGistsGetParams): Promise<String>
readBinary(params?: OctokatUsersFnGistsGetParams): Promise<any>
 }
orgs: { 


fetch(params?: OctokatUsersFnOrgsGetParams): Promise<any>
read(params?: OctokatUsersFnOrgsGetParams): Promise<String>
readBinary(params?: OctokatUsersFnOrgsGetParams): Promise<any>
 }
repos: { 


fetch(params?: OctokatUsersFnReposGetParams): Promise<any>
read(params?: OctokatUsersFnReposGetParams): Promise<String>
readBinary(params?: OctokatUsersFnReposGetParams): Promise<any>
 }
followers: { 


fetch(params?: OctokatUsersFnFollowersGetParams): Promise<any>
read(params?: OctokatUsersFnFollowersGetParams): Promise<String>
readBinary(params?: OctokatUsersFnFollowersGetParams): Promise<any>
 }
following: { 
(target_user: any): { 


fetch(params: OctokatUsersFnFollowingFnGetParams): Promise<any>
read(params: OctokatUsersFnFollowingFnGetParams): Promise<String>
readBinary(params: OctokatUsersFnFollowingFnGetParams): Promise<any>
 }

fetch(params?: OctokatUsersFnFollowingGetParams): Promise<any>
read(params?: OctokatUsersFnFollowingGetParams): Promise<String>
readBinary(params?: OctokatUsersFnFollowingGetParams): Promise<any>
 }
keys: { 


fetch(params?: OctokatUsersFnKeysGetParams): Promise<any>
read(params?: OctokatUsersFnKeysGetParams): Promise<String>
readBinary(params?: OctokatUsersFnKeysGetParams): Promise<any>
 }
siteAdmin: { 


add(): Promise<any>
remove(): Promise<any>
 }
suspended: { 


add(): Promise<any>
remove(): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

fetch(params?: OctokatUsersGetParams): Promise<any>
read(params?: OctokatUsersGetParams): Promise<String>
readBinary(params?: OctokatUsersGetParams): Promise<any>
 }
feeds: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
notifications: { 


// Syntactic shortcut used here
threads(id: any): { 

subscription: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
add(params?: OctokatNotificationsThreadsSubscriptionPutParams): Promise<any>
remove(): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(): Promise<any>
 }

fetch(params?: OctokatNotificationsGetParams): Promise<any>
read(params?: OctokatNotificationsGetParams): Promise<String>
readBinary(params?: OctokatNotificationsGetParams): Promise<any>
add(params?: OctokatNotificationsPutParams): Promise<any>
 }
user: { 
(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
starred: { 
(owner: any, repo: any): { 


fetch(params?: OctokatUserStarredFnGetParams): Promise<any>
read(params?: OctokatUserStarredFnGetParams): Promise<String>
readBinary(params?: OctokatUserStarredFnGetParams): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatUserStarredGetParams): Promise<any>
read(params?: OctokatUserStarredGetParams): Promise<String>
readBinary(params?: OctokatUserStarredGetParams): Promise<any>
 }
subscriptions: { 


fetch(params?: OctokatUserSubscriptionsGetParams): Promise<any>
read(params?: OctokatUserSubscriptionsGetParams): Promise<String>
readBinary(params?: OctokatUserSubscriptionsGetParams): Promise<any>
 }
issues: { 


fetch(params?: OctokatUserIssuesGetParams): Promise<any>
read(params?: OctokatUserIssuesGetParams): Promise<String>
readBinary(params?: OctokatUserIssuesGetParams): Promise<any>
 }
repos: { 


fetch(params?: OctokatUserReposGetParams): Promise<any>
read(params?: OctokatUserReposGetParams): Promise<String>
readBinary(params?: OctokatUserReposGetParams): Promise<any>
create(params?: OctokatUserReposPostParams): Promise<any>
 }
orgs: { 


fetch(params?: OctokatUserOrgsGetParams): Promise<any>
read(params?: OctokatUserOrgsGetParams): Promise<String>
readBinary(params?: OctokatUserOrgsGetParams): Promise<any>
 }
memberships: { 

orgs: { 
(org: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params: OctokatUserMembershipsOrgsFnPatchParams): Promise<any>
 }

fetch(params?: OctokatUserMembershipsOrgsGetParams): Promise<any>
read(params?: OctokatUserMembershipsOrgsGetParams): Promise<String>
readBinary(params?: OctokatUserMembershipsOrgsGetParams): Promise<any>
 }

 }
teams: { 


fetch(params?: OctokatUserTeamsGetParams): Promise<any>
read(params?: OctokatUserTeamsGetParams): Promise<String>
readBinary(params?: OctokatUserTeamsGetParams): Promise<any>
 }
publicEmails: { 


fetch(params?: OctokatUserPublicEmailsGetParams): Promise<SearchResult<UserEmail>>
fetchAll(params?: OctokatUserPublicEmailsGetParams): Promise<UserEmail[]>
read(params?: OctokatUserPublicEmailsGetParams): Promise<String>
readBinary(params?: OctokatUserPublicEmailsGetParams): Promise<any>
 }
emails: { 


fetch(params?: OctokatUserEmailsGetParams): Promise<SearchResult<UserEmail>>
fetchAll(params?: OctokatUserEmailsGetParams): Promise<UserEmail[]>
read(params?: OctokatUserEmailsGetParams): Promise<String>
readBinary(params?: OctokatUserEmailsGetParams): Promise<any>
create(params: OctokatUserEmailsPostParams): Promise<any>
remove(params: OctokatUserEmailsDeleteParams): Promise<any>
 }
followers: { 


fetch(params?: OctokatUserFollowersGetParams): Promise<any>
read(params?: OctokatUserFollowersGetParams): Promise<String>
readBinary(params?: OctokatUserFollowersGetParams): Promise<any>
 }
following: { 
(username: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatUserFollowingGetParams): Promise<any>
read(params?: OctokatUserFollowingGetParams): Promise<String>
readBinary(params?: OctokatUserFollowingGetParams): Promise<any>
 }
keys: { 
(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatUserKeysGetParams): Promise<any>
read(params?: OctokatUserKeysGetParams): Promise<String>
readBinary(params?: OctokatUserKeysGetParams): Promise<any>
create(params?: OctokatUserKeysPostParams): Promise<any>
 }
gpgKeys: { 
(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatUserGpgKeysGetParams): Promise<any>
read(params?: OctokatUserGpgKeysGetParams): Promise<String>
readBinary(params?: OctokatUserGpgKeysGetParams): Promise<any>
create(params: OctokatUserGpgKeysPostParams): Promise<any>
 }
blocks: { 
(username: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
repositoryInvitations: { 
(invitation_id: any): { 


update(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
fetch(): Promise<User>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatUserPatchParams): Promise<any>
 }
gists: { 
(id: any): { 

commits: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
star: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }
forks: { 


fetch(params?: OctokatGistsFnForksGetParams): Promise<any>
read(params?: OctokatGistsFnForksGetParams): Promise<String>
readBinary(params?: OctokatGistsFnForksGetParams): Promise<any>
create(): Promise<any>
 }
comments: { 
(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatGistsFnCommentsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
create(params?: OctokatGistsFnCommentsPostParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatGistsFnPatchParams): Promise<any>
remove(): Promise<any>
 }
public: { 


fetch(params?: OctokatGistsPublicGetParams): Promise<any>
read(params?: OctokatGistsPublicGetParams): Promise<String>
readBinary(params?: OctokatGistsPublicGetParams): Promise<any>
 }
starred: { 


fetch(params?: OctokatGistsStarredGetParams): Promise<any>
read(params?: OctokatGistsStarredGetParams): Promise<String>
readBinary(params?: OctokatGistsStarredGetParams): Promise<any>
 }
fetch(params?: OctokatGistsGetParams): Promise<any>
read(params?: OctokatGistsGetParams): Promise<String>
readBinary(params?: OctokatGistsGetParams): Promise<any>
create(params: OctokatGistsPostParams): Promise<any>
 }
integration: { 

installations: { 


fetch(params?: OctokatIntegrationInstallationsGetParams): Promise<any>
read(params?: OctokatIntegrationInstallationsGetParams): Promise<String>
readBinary(params?: OctokatIntegrationInstallationsGetParams): Promise<any>
 }
identity: { 

user: { 


create(params?: OctokatIntegrationIdentityUserPostParams): Promise<any>
 }

 }

 }

// Syntactic shortcut used here
installations(installation_id: any): { 

accessTokens: { 


create(params?: OctokatInstallationsAccessTokensPostParams): Promise<any>
 }

// Syntactic shortcut used here
repositories(repository_id: any): { 


create(): Promise<any>
 }


 }

installation: { 

repositories: { 


fetch(params?: OctokatInstallationRepositoriesGetParams): Promise<any>
read(params?: OctokatInstallationRepositoriesGetParams): Promise<String>
readBinary(params?: OctokatInstallationRepositoriesGetParams): Promise<any>
 }

 }
issues: { 


fetch(params?: OctokatIssuesGetParams): Promise<any>
read(params?: OctokatIssuesGetParams): Promise<String>
readBinary(params?: OctokatIssuesGetParams): Promise<any>
 }
emojis: { 


fetch(): Promise<Emojis>
read(): Promise<String>
readBinary(): Promise<any>
 }
gitignore: { 

templates: { 
(name: any): { 


fetch(params: OctokatGitignoreTemplatesFnGetParams): Promise<any>
read(params: OctokatGitignoreTemplatesFnGetParams): Promise<String>
readBinary(params: OctokatGitignoreTemplatesFnGetParams): Promise<any>
 }

fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

 }
licenses: { 
(license: any): { 


fetch(params: OctokatLicensesFnGetParams): Promise<any>
read(params: OctokatLicensesFnGetParams): Promise<String>
readBinary(params: OctokatLicensesFnGetParams): Promise<any>
 }

fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
markdown: { 

raw: { 


create(params?: OctokatMarkdownRawPostParams): Promise<any>
 }
create(params: OctokatMarkdownPostParams): Promise<any>
 }
meta: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
rateLimit: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
organizations: { 


fetch(params?: OctokatOrganizationsGetParams): Promise<any>
read(params?: OctokatOrganizationsGetParams): Promise<String>
readBinary(params?: OctokatOrganizationsGetParams): Promise<any>
 }

// Syntactic shortcut used here
teams(id: any): { 

members: { 


fetch(params?: OctokatTeamsMembersGetParams): Promise<any>
read(params?: OctokatTeamsMembersGetParams): Promise<String>
readBinary(params?: OctokatTeamsMembersGetParams): Promise<any>
 }

// Syntactic shortcut used here
memberships(username: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
add(params?: OctokatTeamsMembershipsPutParams): Promise<any>
remove(): Promise<any>
 }

repos: { 
(owner: any, repo: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
add(params?: OctokatTeamsReposFnPutParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatTeamsReposGetParams): Promise<any>
read(params?: OctokatTeamsReposGetParams): Promise<String>
readBinary(params?: OctokatTeamsReposGetParams): Promise<any>
 }
invitations: { 


fetch(params?: OctokatTeamsInvitationsGetParams): Promise<any>
read(params?: OctokatTeamsInvitationsGetParams): Promise<String>
readBinary(params?: OctokatTeamsInvitationsGetParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatTeamsPatchParams): Promise<any>
remove(): Promise<any>
 }

projects: { 
(id: any): { 

columns: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
create(params?: OctokatProjectsFnColumnsPostParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatProjectsFnPatchParams): Promise<any>
remove(): Promise<any>
 }
columns: { 
(id: any): { 

cards: { 


fetch(params?: OctokatProjectsColumnsFnCardsGetParams): Promise<any>
read(params?: OctokatProjectsColumnsFnCardsGetParams): Promise<String>
readBinary(params?: OctokatProjectsColumnsFnCardsGetParams): Promise<any>
create(params?: OctokatProjectsColumnsFnCardsPostParams): Promise<any>
 }
moves: { 


create(params: OctokatProjectsColumnsFnMovesPostParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatProjectsColumnsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

// Syntactic shortcut used here
cards(id: any): { 

moves: { 


create(params: OctokatProjectsColumnsCardsMovesPostParams): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params?: OctokatProjectsColumnsCardsPatchParams): Promise<any>
remove(): Promise<any>
 }


 }

 }

// Syntactic shortcut used here
reactions(id: any): { 


remove(): Promise<any>
 }

repositories: { 
(id: any): { 

community: { 

profile: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

 }
invitations: { 
(invitation_id: any): { 


update(params?: OctokatRepositoriesFnInvitationsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

fetch(params?: OctokatRepositoriesGetParams): Promise<any>
read(params?: OctokatRepositoriesGetParams): Promise<String>
readBinary(params?: OctokatRepositoriesGetParams): Promise<any>
 }
search: { 

repositories: { 


fetch(params?: OctokatSearchRepositoriesGetParams): Promise<any>
read(params?: OctokatSearchRepositoriesGetParams): Promise<String>
readBinary(params?: OctokatSearchRepositoriesGetParams): Promise<any>
 }
code: { 


fetch(params?: OctokatSearchCodeGetParams): Promise<any>
read(params?: OctokatSearchCodeGetParams): Promise<String>
readBinary(params?: OctokatSearchCodeGetParams): Promise<any>
 }
commits: { 


fetch(params?: OctokatSearchCommitsGetParams): Promise<any>
read(params?: OctokatSearchCommitsGetParams): Promise<String>
readBinary(params?: OctokatSearchCommitsGetParams): Promise<any>
 }
issues: { 


fetch(params?: OctokatSearchIssuesGetParams): Promise<any>
read(params?: OctokatSearchIssuesGetParams): Promise<String>
readBinary(params?: OctokatSearchIssuesGetParams): Promise<any>
 }
users: { 


fetch(params: OctokatSearchUsersGetParams): Promise<any>
read(params: OctokatSearchUsersGetParams): Promise<String>
readBinary(params: OctokatSearchUsersGetParams): Promise<any>
 }

 }
legacy: { 

user: { 


// Syntactic shortcut used here
email(email: any): { 


fetch(params: OctokatLegacyUserEmailGetParams): Promise<any>
read(params: OctokatLegacyUserEmailGetParams): Promise<String>
readBinary(params: OctokatLegacyUserEmailGetParams): Promise<any>
 }


 }

 }
enterprise: { 


// Syntactic shortcut used here
stats(type: any): { 


fetch(params: OctokatEnterpriseStatsGetParams): Promise<any>
read(params: OctokatEnterpriseStatsGetParams): Promise<String>
readBinary(params: OctokatEnterpriseStatsGetParams): Promise<any>
 }

settings: { 

license: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }

 }

 }
admin: { 

ldap: { 


// Syntactic shortcut used here
users(username: any): { 

mapping: { 


update(params: OctokatAdminLdapUsersMappingPatchParams): Promise<any>
 }
sync: { 


create(): Promise<any>
 }

 }


// Syntactic shortcut used here
teams(team_id: any): { 

mapping: { 


update(params: OctokatAdminLdapTeamsMappingPatchParams): Promise<any>
 }
sync: { 


create(params: OctokatAdminLdapTeamsSyncPostParams): Promise<any>
 }

 }


 }
preReceiveEnvironments: { 
(id: any): { 

downloads: { 

latest: { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
 }
create(): Promise<any>
 }
fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params: OctokatAdminPreReceiveEnvironmentsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
create(params: OctokatAdminPreReceiveEnvironmentsPostParams): Promise<any>
 }
preReceiveHooks: { 
(id: any): { 


fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
update(params: OctokatAdminPreReceiveHooksFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
read(): Promise<String>
readBinary(): Promise<any>
create(params: OctokatAdminPreReceiveHooksPostParams): Promise<any>
 }
organizations: { 


create(params: OctokatAdminOrganizationsPostParams): Promise<any>
 }

 }
staff: { 

indexingJobs: { 


create(params: OctokatStaffIndexingJobsPostParams): Promise<any>
 }

 }
zen: { 



 }


  }
}
