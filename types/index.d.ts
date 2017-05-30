

declare module 'octokat' {
  // Response Types
  export type CommitDiff = { 'url': string;
'html_url': string;
'permalink_url': string;
'diff_url': string;
'patch_url': string;
'base_commit': RepoCommitMaybe;
'merge_base_commit': RepoCommitMaybe;
'status': string;
'ahead_by': number;
'behind_by': number;
'total_commits': number;
'commits': any[];
'files': any[]; };

export type CommitDiffSlug = { 'url': string;
'html_url': string;
'diff_url': string;
'patch_url': string; };

export type CommitSlugMaybe = { 'sha': string;
'url': string;
'html_url': string; };

export type Download = { 'url': string;
'id': number;
'html_url': string;
'name': string;
'description': string;
'created_at': string;
'size': number;
'download_count': number;
'content_type': string; };

export type Emojis = { '100': string;
'1234': string;
'+1': string;
'-1': string;
'1st_place_medal': string;
'2nd_place_medal': string;
'3rd_place_medal': string;
'8ball': string;
'a': string;
'ab': string;
'abc': string;
'abcd': string;
'accept': string;
'aerial_tramway': string;
'afghanistan': string;
'airplane': string;
'aland_islands': string;
'alarm_clock': string;
'albania': string;
'alembic': string;
'algeria': string;
'alien': string;
'ambulance': string;
'american_samoa': string;
'amphora': string;
'anchor': string;
'andorra': string;
'angel': string;
'anger': string;
'angola': string;
'angry': string;
'anguilla': string;
'anguished': string;
'ant': string;
'antarctica': string;
'antigua_barbuda': string;
'apple': string;
'aquarius': string;
'argentina': string;
'aries': string;
'armenia': string;
'arrow_backward': string;
'arrow_double_down': string;
'arrow_double_up': string;
'arrow_down': string;
'arrow_down_small': string;
'arrow_forward': string;
'arrow_heading_down': string;
'arrow_heading_up': string;
'arrow_left': string;
'arrow_lower_left': string;
'arrow_lower_right': string;
'arrow_right': string;
'arrow_right_hook': string;
'arrow_up': string;
'arrow_up_down': string;
'arrow_up_small': string;
'arrow_upper_left': string;
'arrow_upper_right': string;
'arrows_clockwise': string;
'arrows_counterclockwise': string;
'art': string;
'articulated_lorry': string;
'artificial_satellite': string;
'aruba': string;
'asterisk': string;
'astonished': string;
'athletic_shoe': string;
'atm': string;
'atom': string;
'atom_symbol': string;
'australia': string;
'austria': string;
'avocado': string;
'azerbaijan': string;
'b': string;
'baby': string;
'baby_bottle': string;
'baby_chick': string;
'baby_symbol': string;
'back': string;
'bacon': string;
'badminton': string;
'baggage_claim': string;
'baguette_bread': string;
'bahamas': string;
'bahrain': string;
'balance_scale': string;
'balloon': string;
'ballot_box': string;
'ballot_box_with_check': string;
'bamboo': string;
'banana': string;
'bangbang': string;
'bangladesh': string;
'bank': string;
'bar_chart': string;
'barbados': string;
'barber': string;
'baseball': string;
'basecamp': string;
'basecampy': string;
'basketball': string;
'basketball_man': string;
'basketball_woman': string;
'bat': string;
'bath': string;
'bathtub': string;
'battery': string;
'beach_umbrella': string;
'bear': string;
'bed': string;
'bee': string;
'beer': string;
'beers': string;
'beetle': string;
'beginner': string;
'belarus': string;
'belgium': string;
'belize': string;
'bell': string;
'bellhop_bell': string;
'benin': string;
'bento': string;
'bermuda': string;
'bhutan': string;
'bicyclist': string;
'bike': string;
'biking_man': string;
'biking_woman': string;
'bikini': string;
'biohazard': string;
'bird': string;
'birthday': string;
'black_circle': string;
'black_flag': string;
'black_heart': string;
'black_joker': string;
'black_large_square': string;
'black_medium_small_square': string;
'black_medium_square': string;
'black_nib': string;
'black_small_square': string;
'black_square_button': string;
'blonde_man': string;
'blonde_woman': string;
'blossom': string;
'blowfish': string;
'blue_book': string;
'blue_car': string;
'blue_heart': string;
'blush': string;
'boar': string;
'boat': string;
'bolivia': string;
'bomb': string;
'book': string;
'bookmark': string;
'bookmark_tabs': string;
'books': string;
'boom': string;
'boot': string;
'bosnia_herzegovina': string;
'botswana': string;
'bouquet': string;
'bow': string;
'bow_and_arrow': string;
'bowing_man': string;
'bowing_woman': string;
'bowling': string;
'bowtie': string;
'boxing_glove': string;
'boy': string;
'brazil': string;
'bread': string;
'bride_with_veil': string;
'bridge_at_night': string;
'briefcase': string;
'british_indian_ocean_territory': string;
'british_virgin_islands': string;
'broken_heart': string;
'brunei': string;
'bug': string;
'building_construction': string;
'bulb': string;
'bulgaria': string;
'bullettrain_front': string;
'bullettrain_side': string;
'burkina_faso': string;
'burrito': string;
'burundi': string;
'bus': string;
'business_suit_levitating': string;
'busstop': string;
'bust_in_silhouette': string;
'busts_in_silhouette': string;
'butterfly': string;
'cactus': string;
'cake': string;
'calendar': string;
'call_me_hand': string;
'calling': string;
'cambodia': string;
'camel': string;
'camera': string;
'camera_flash': string;
'cameroon': string;
'camping': string;
'canada': string;
'canary_islands': string;
'cancer': string;
'candle': string;
'candy': string;
'canoe': string;
'cape_verde': string;
'capital_abcd': string;
'capricorn': string;
'car': string;
'card_file_box': string;
'card_index': string;
'card_index_dividers': string;
'caribbean_netherlands': string;
'carousel_horse': string;
'carrot': string;
'cat': string;
'cat2': string;
'cayman_islands': string;
'cd': string;
'central_african_republic': string;
'chad': string;
'chains': string;
'champagne': string;
'chart': string;
'chart_with_downwards_trend': string;
'chart_with_upwards_trend': string;
'checkered_flag': string;
'cheese': string;
'cherries': string;
'cherry_blossom': string;
'chestnut': string;
'chicken': string;
'children_crossing': string;
'chile': string;
'chipmunk': string;
'chocolate_bar': string;
'christmas_island': string;
'christmas_tree': string;
'church': string;
'cinema': string;
'circus_tent': string;
'city_sunrise': string;
'city_sunset': string;
'cityscape': string;
'cl': string;
'clamp': string;
'clap': string;
'clapper': string;
'classical_building': string;
'clinking_glasses': string;
'clipboard': string;
'clock1': string;
'clock10': string;
'clock1030': string;
'clock11': string;
'clock1130': string;
'clock12': string;
'clock1230': string;
'clock130': string;
'clock2': string;
'clock230': string;
'clock3': string;
'clock330': string;
'clock4': string;
'clock430': string;
'clock5': string;
'clock530': string;
'clock6': string;
'clock630': string;
'clock7': string;
'clock730': string;
'clock8': string;
'clock830': string;
'clock9': string;
'clock930': string;
'closed_book': string;
'closed_lock_with_key': string;
'closed_umbrella': string;
'cloud': string;
'cloud_with_lightning': string;
'cloud_with_lightning_and_rain': string;
'cloud_with_rain': string;
'cloud_with_snow': string;
'clown_face': string;
'clubs': string;
'cn': string;
'cocktail': string;
'cocos_islands': string;
'coffee': string;
'coffin': string;
'cold_sweat': string;
'collision': string;
'colombia': string;
'comet': string;
'comoros': string;
'computer': string;
'computer_mouse': string;
'confetti_ball': string;
'confounded': string;
'confused': string;
'congo_brazzaville': string;
'congo_kinshasa': string;
'congratulations': string;
'construction': string;
'construction_worker': string;
'construction_worker_man': string;
'construction_worker_woman': string;
'control_knobs': string;
'convenience_store': string;
'cook_islands': string;
'cookie': string;
'cool': string;
'cop': string;
'copyright': string;
'corn': string;
'costa_rica': string;
'cote_divoire': string;
'couch_and_lamp': string;
'couple': string;
'couple_with_heart': string;
'couple_with_heart_man_man': string;
'couple_with_heart_woman_man': string;
'couple_with_heart_woman_woman': string;
'couplekiss_man_man': string;
'couplekiss_man_woman': string;
'couplekiss_woman_woman': string;
'cow': string;
'cow2': string;
'cowboy_hat_face': string;
'crab': string;
'crayon': string;
'credit_card': string;
'crescent_moon': string;
'cricket': string;
'croatia': string;
'crocodile': string;
'croissant': string;
'crossed_fingers': string;
'crossed_flags': string;
'crossed_swords': string;
'crown': string;
'cry': string;
'crying_cat_face': string;
'crystal_ball': string;
'cuba': string;
'cucumber': string;
'cupid': string;
'curacao': string;
'curly_loop': string;
'currency_exchange': string;
'curry': string;
'custard': string;
'customs': string;
'cyclone': string;
'cyprus': string;
'czech_republic': string;
'dagger': string;
'dancer': string;
'dancers': string;
'dancing_men': string;
'dancing_women': string;
'dango': string;
'dark_sunglasses': string;
'dart': string;
'dash': string;
'date': string;
'de': string;
'deciduous_tree': string;
'deer': string;
'denmark': string;
'department_store': string;
'derelict_house': string;
'desert': string;
'desert_island': string;
'desktop_computer': string;
'detective': string;
'diamond_shape_with_a_dot_inside': string;
'diamonds': string;
'disappointed': string;
'disappointed_relieved': string;
'dizzy': string;
'dizzy_face': string;
'djibouti': string;
'do_not_litter': string;
'dog': string;
'dog2': string;
'dollar': string;
'dolls': string;
'dolphin': string;
'dominica': string;
'dominican_republic': string;
'door': string;
'doughnut': string;
'dove': string;
'dragon': string;
'dragon_face': string;
'dress': string;
'dromedary_camel': string;
'drooling_face': string;
'droplet': string;
'drum': string;
'duck': string;
'dvd': string;
'e-mail': string;
'eagle': string;
'ear': string;
'ear_of_rice': string;
'earth_africa': string;
'earth_americas': string;
'earth_asia': string;
'ecuador': string;
'egg': string;
'eggplant': string;
'egypt': string;
'eight': string;
'eight_pointed_black_star': string;
'eight_spoked_asterisk': string;
'el_salvador': string;
'electric_plug': string;
'electron': string;
'elephant': string;
'email': string;
'end': string;
'envelope': string;
'envelope_with_arrow': string;
'equatorial_guinea': string;
'eritrea': string;
'es': string;
'estonia': string;
'ethiopia': string;
'eu': string;
'euro': string;
'european_castle': string;
'european_post_office': string;
'european_union': string;
'evergreen_tree': string;
'exclamation': string;
'expressionless': string;
'eye': string;
'eye_speech_bubble': string;
'eyeglasses': string;
'eyes': string;
'face_with_head_bandage': string;
'face_with_thermometer': string;
'facepunch': string;
'factory': string;
'falkland_islands': string;
'fallen_leaf': string;
'family': string;
'family_man_boy': string;
'family_man_boy_boy': string;
'family_man_girl': string;
'family_man_girl_boy': string;
'family_man_girl_girl': string;
'family_man_man_boy': string;
'family_man_man_boy_boy': string;
'family_man_man_girl': string;
'family_man_man_girl_boy': string;
'family_man_man_girl_girl': string;
'family_man_woman_boy': string;
'family_man_woman_boy_boy': string;
'family_man_woman_girl': string;
'family_man_woman_girl_boy': string;
'family_man_woman_girl_girl': string;
'family_woman_boy': string;
'family_woman_boy_boy': string;
'family_woman_girl': string;
'family_woman_girl_boy': string;
'family_woman_girl_girl': string;
'family_woman_woman_boy': string;
'family_woman_woman_boy_boy': string;
'family_woman_woman_girl': string;
'family_woman_woman_girl_boy': string;
'family_woman_woman_girl_girl': string;
'faroe_islands': string;
'fast_forward': string;
'fax': string;
'fearful': string;
'feelsgood': string;
'feet': string;
'female_detective': string;
'ferris_wheel': string;
'ferry': string;
'field_hockey': string;
'fiji': string;
'file_cabinet': string;
'file_folder': string;
'film_projector': string;
'film_strip': string;
'finland': string;
'finnadie': string;
'fire': string;
'fire_engine': string;
'fireworks': string;
'first_quarter_moon': string;
'first_quarter_moon_with_face': string;
'fish': string;
'fish_cake': string;
'fishing_pole_and_fish': string;
'fist': string;
'fist_left': string;
'fist_oncoming': string;
'fist_raised': string;
'fist_right': string;
'five': string;
'flags': string;
'flashlight': string;
'fleur_de_lis': string;
'flight_arrival': string;
'flight_departure': string;
'flipper': string;
'floppy_disk': string;
'flower_playing_cards': string;
'flushed': string;
'fog': string;
'foggy': string;
'football': string;
'footprints': string;
'fork_and_knife': string;
'fountain': string;
'fountain_pen': string;
'four': string;
'four_leaf_clover': string;
'fox_face': string;
'fr': string;
'framed_picture': string;
'free': string;
'french_guiana': string;
'french_polynesia': string;
'french_southern_territories': string;
'fried_egg': string;
'fried_shrimp': string;
'fries': string;
'frog': string;
'frowning': string;
'frowning_face': string;
'frowning_man': string;
'frowning_woman': string;
'fu': string;
'fuelpump': string;
'full_moon': string;
'full_moon_with_face': string;
'funeral_urn': string;
'gabon': string;
'gambia': string;
'game_die': string;
'gb': string;
'gear': string;
'gem': string;
'gemini': string;
'georgia': string;
'ghana': string;
'ghost': string;
'gibraltar': string;
'gift': string;
'gift_heart': string;
'girl': string;
'globe_with_meridians': string;
'goal_net': string;
'goat': string;
'goberserk': string;
'godmode': string;
'golf': string;
'golfing_man': string;
'golfing_woman': string;
'gorilla': string;
'grapes': string;
'greece': string;
'green_apple': string;
'green_book': string;
'green_heart': string;
'green_salad': string;
'greenland': string;
'grenada': string;
'grey_exclamation': string;
'grey_question': string;
'grimacing': string;
'grin': string;
'grinning': string;
'guadeloupe': string;
'guam': string;
'guardsman': string;
'guardswoman': string;
'guatemala': string;
'guernsey': string;
'guinea': string;
'guinea_bissau': string;
'guitar': string;
'gun': string;
'guyana': string;
'haircut': string;
'haircut_man': string;
'haircut_woman': string;
'haiti': string;
'hamburger': string;
'hammer': string;
'hammer_and_pick': string;
'hammer_and_wrench': string;
'hamster': string;
'hand': string;
'handbag': string;
'handshake': string;
'hankey': string;
'hash': string;
'hatched_chick': string;
'hatching_chick': string;
'headphones': string;
'hear_no_evil': string;
'heart': string;
'heart_decoration': string;
'heart_eyes': string;
'heart_eyes_cat': string;
'heartbeat': string;
'heartpulse': string;
'hearts': string;
'heavy_check_mark': string;
'heavy_division_sign': string;
'heavy_dollar_sign': string;
'heavy_exclamation_mark': string;
'heavy_heart_exclamation': string;
'heavy_minus_sign': string;
'heavy_multiplication_x': string;
'heavy_plus_sign': string;
'helicopter': string;
'herb': string;
'hibiscus': string;
'high_brightness': string;
'high_heel': string;
'hocho': string;
'hole': string;
'honduras': string;
'honey_pot': string;
'honeybee': string;
'hong_kong': string;
'horse': string;
'horse_racing': string;
'hospital': string;
'hot_pepper': string;
'hotdog': string;
'hotel': string;
'hotsprings': string;
'hourglass': string;
'hourglass_flowing_sand': string;
'house': string;
'house_with_garden': string;
'houses': string;
'hugs': string;
'hungary': string;
'hurtrealbad': string;
'hushed': string;
'ice_cream': string;
'ice_hockey': string;
'ice_skate': string;
'icecream': string;
'iceland': string;
'id': string;
'ideograph_advantage': string;
'imp': string;
'inbox_tray': string;
'incoming_envelope': string;
'india': string;
'indonesia': string;
'information_desk_person': string;
'information_source': string;
'innocent': string;
'interrobang': string;
'iphone': string;
'iran': string;
'iraq': string;
'ireland': string;
'isle_of_man': string;
'israel': string;
'it': string;
'izakaya_lantern': string;
'jack_o_lantern': string;
'jamaica': string;
'japan': string;
'japanese_castle': string;
'japanese_goblin': string;
'japanese_ogre': string;
'jeans': string;
'jersey': string;
'jordan': string;
'joy': string;
'joy_cat': string;
'joystick': string;
'jp': string;
'kaaba': string;
'kazakhstan': string;
'kenya': string;
'key': string;
'keyboard': string;
'keycap_ten': string;
'kick_scooter': string;
'kimono': string;
'kiribati': string;
'kiss': string;
'kissing': string;
'kissing_cat': string;
'kissing_closed_eyes': string;
'kissing_heart': string;
'kissing_smiling_eyes': string;
'kiwi_fruit': string;
'knife': string;
'koala': string;
'koko': string;
'kosovo': string;
'kr': string;
'kuwait': string;
'kyrgyzstan': string;
'label': string;
'lantern': string;
'laos': string;
'large_blue_circle': string;
'large_blue_diamond': string;
'large_orange_diamond': string;
'last_quarter_moon': string;
'last_quarter_moon_with_face': string;
'latin_cross': string;
'latvia': string;
'laughing': string;
'leaves': string;
'lebanon': string;
'ledger': string;
'left_luggage': string;
'left_right_arrow': string;
'leftwards_arrow_with_hook': string;
'lemon': string;
'leo': string;
'leopard': string;
'lesotho': string;
'level_slider': string;
'liberia': string;
'libra': string;
'libya': string;
'liechtenstein': string;
'light_rail': string;
'link': string;
'lion': string;
'lips': string;
'lipstick': string;
'lithuania': string;
'lizard': string;
'lock': string;
'lock_with_ink_pen': string;
'lollipop': string;
'loop': string;
'loud_sound': string;
'loudspeaker': string;
'love_hotel': string;
'love_letter': string;
'low_brightness': string;
'luxembourg': string;
'lying_face': string;
'm': string;
'macau': string;
'macedonia': string;
'madagascar': string;
'mag': string;
'mag_right': string;
'mahjong': string;
'mailbox': string;
'mailbox_closed': string;
'mailbox_with_mail': string;
'mailbox_with_no_mail': string;
'malawi': string;
'malaysia': string;
'maldives': string;
'male_detective': string;
'mali': string;
'malta': string;
'man': string;
'man_artist': string;
'man_astronaut': string;
'man_cartwheeling': string;
'man_cook': string;
'man_dancing': string;
'man_facepalming': string;
'man_factory_worker': string;
'man_farmer': string;
'man_firefighter': string;
'man_health_worker': string;
'man_in_tuxedo': string;
'man_judge': string;
'man_juggling': string;
'man_mechanic': string;
'man_office_worker': string;
'man_pilot': string;
'man_playing_handball': string;
'man_playing_water_polo': string;
'man_scientist': string;
'man_shrugging': string;
'man_singer': string;
'man_student': string;
'man_teacher': string;
'man_technologist': string;
'man_with_gua_pi_mao': string;
'man_with_turban': string;
'mandarin': string;
'mans_shoe': string;
'mantelpiece_clock': string;
'maple_leaf': string;
'marshall_islands': string;
'martial_arts_uniform': string;
'martinique': string;
'mask': string;
'massage': string;
'massage_man': string;
'massage_woman': string;
'mauritania': string;
'mauritius': string;
'mayotte': string;
'meat_on_bone': string;
'medal_military': string;
'medal_sports': string;
'mega': string;
'melon': string;
'memo': string;
'men_wrestling': string;
'menorah': string;
'mens': string;
'metal': string;
'metro': string;
'mexico': string;
'micronesia': string;
'microphone': string;
'microscope': string;
'middle_finger': string;
'milk_glass': string;
'milky_way': string;
'minibus': string;
'minidisc': string;
'mobile_phone_off': string;
'moldova': string;
'monaco': string;
'money_mouth_face': string;
'money_with_wings': string;
'moneybag': string;
'mongolia': string;
'monkey': string;
'monkey_face': string;
'monorail': string;
'montenegro': string;
'montserrat': string;
'moon': string;
'morocco': string;
'mortar_board': string;
'mosque': string;
'motor_boat': string;
'motor_scooter': string;
'motorcycle': string;
'motorway': string;
'mount_fuji': string;
'mountain': string;
'mountain_bicyclist': string;
'mountain_biking_man': string;
'mountain_biking_woman': string;
'mountain_cableway': string;
'mountain_railway': string;
'mountain_snow': string;
'mouse': string;
'mouse2': string;
'movie_camera': string;
'moyai': string;
'mozambique': string;
'mrs_claus': string;
'muscle': string;
'mushroom': string;
'musical_keyboard': string;
'musical_note': string;
'musical_score': string;
'mute': string;
'myanmar': string;
'nail_care': string;
'name_badge': string;
'namibia': string;
'national_park': string;
'nauru': string;
'nauseated_face': string;
'neckbeard': string;
'necktie': string;
'negative_squared_cross_mark': string;
'nepal': string;
'nerd_face': string;
'netherlands': string;
'neutral_face': string;
'new': string;
'new_caledonia': string;
'new_moon': string;
'new_moon_with_face': string;
'new_zealand': string;
'newspaper': string;
'newspaper_roll': string;
'next_track_button': string;
'ng': string;
'ng_man': string;
'ng_woman': string;
'nicaragua': string;
'niger': string;
'nigeria': string;
'night_with_stars': string;
'nine': string;
'niue': string;
'no_bell': string;
'no_bicycles': string;
'no_entry': string;
'no_entry_sign': string;
'no_good': string;
'no_good_man': string;
'no_good_woman': string;
'no_mobile_phones': string;
'no_mouth': string;
'no_pedestrians': string;
'no_smoking': string;
'non-potable_water': string;
'norfolk_island': string;
'north_korea': string;
'northern_mariana_islands': string;
'norway': string;
'nose': string;
'notebook': string;
'notebook_with_decorative_cover': string;
'notes': string;
'nut_and_bolt': string;
'o': string;
'o2': string;
'ocean': string;
'octocat': string;
'octopus': string;
'oden': string;
'office': string;
'oil_drum': string;
'ok': string;
'ok_hand': string;
'ok_man': string;
'ok_woman': string;
'old_key': string;
'older_man': string;
'older_woman': string;
'om': string;
'oman': string;
'on': string;
'oncoming_automobile': string;
'oncoming_bus': string;
'oncoming_police_car': string;
'oncoming_taxi': string;
'one': string;
'open_book': string;
'open_file_folder': string;
'open_hands': string;
'open_mouth': string;
'open_umbrella': string;
'ophiuchus': string;
'orange': string;
'orange_book': string;
'orthodox_cross': string;
'outbox_tray': string;
'owl': string;
'ox': string;
'package': string;
'page_facing_up': string;
'page_with_curl': string;
'pager': string;
'paintbrush': string;
'pakistan': string;
'palau': string;
'palestinian_territories': string;
'palm_tree': string;
'panama': string;
'pancakes': string;
'panda_face': string;
'paperclip': string;
'paperclips': string;
'papua_new_guinea': string;
'paraguay': string;
'parasol_on_ground': string;
'parking': string;
'part_alternation_mark': string;
'partly_sunny': string;
'passenger_ship': string;
'passport_control': string;
'pause_button': string;
'paw_prints': string;
'peace_symbol': string;
'peach': string;
'peanuts': string;
'pear': string;
'pen': string;
'pencil': string;
'pencil2': string;
'penguin': string;
'pensive': string;
'performing_arts': string;
'persevere': string;
'person_fencing': string;
'person_frowning': string;
'person_with_blond_hair': string;
'person_with_pouting_face': string;
'peru': string;
'philippines': string;
'phone': string;
'pick': string;
'pig': string;
'pig2': string;
'pig_nose': string;
'pill': string;
'pineapple': string;
'ping_pong': string;
'pisces': string;
'pitcairn_islands': string;
'pizza': string;
'place_of_worship': string;
'plate_with_cutlery': string;
'play_or_pause_button': string;
'point_down': string;
'point_left': string;
'point_right': string;
'point_up': string;
'point_up_2': string;
'poland': string;
'police_car': string;
'policeman': string;
'policewoman': string;
'poodle': string;
'poop': string;
'popcorn': string;
'portugal': string;
'post_office': string;
'postal_horn': string;
'postbox': string;
'potable_water': string;
'potato': string;
'pouch': string;
'poultry_leg': string;
'pound': string;
'pout': string;
'pouting_cat': string;
'pouting_man': string;
'pouting_woman': string;
'pray': string;
'prayer_beads': string;
'pregnant_woman': string;
'previous_track_button': string;
'prince': string;
'princess': string;
'printer': string;
'puerto_rico': string;
'punch': string;
'purple_heart': string;
'purse': string;
'pushpin': string;
'put_litter_in_its_place': string;
'qatar': string;
'question': string;
'rabbit': string;
'rabbit2': string;
'racehorse': string;
'racing_car': string;
'radio': string;
'radio_button': string;
'radioactive': string;
'rage': string;
'rage1': string;
'rage2': string;
'rage3': string;
'rage4': string;
'railway_car': string;
'railway_track': string;
'rainbow': string;
'rainbow_flag': string;
'raised_back_of_hand': string;
'raised_hand': string;
'raised_hand_with_fingers_splayed': string;
'raised_hands': string;
'raising_hand': string;
'raising_hand_man': string;
'raising_hand_woman': string;
'ram': string;
'ramen': string;
'rat': string;
'record_button': string;
'recycle': string;
'red_car': string;
'red_circle': string;
'registered': string;
'relaxed': string;
'relieved': string;
'reminder_ribbon': string;
'repeat': string;
'repeat_one': string;
'rescue_worker_helmet': string;
'restroom': string;
'reunion': string;
'revolving_hearts': string;
'rewind': string;
'rhinoceros': string;
'ribbon': string;
'rice': string;
'rice_ball': string;
'rice_cracker': string;
'rice_scene': string;
'right_anger_bubble': string;
'ring': string;
'robot': string;
'rocket': string;
'rofl': string;
'roll_eyes': string;
'roller_coaster': string;
'romania': string;
'rooster': string;
'rose': string;
'rosette': string;
'rotating_light': string;
'round_pushpin': string;
'rowboat': string;
'rowing_man': string;
'rowing_woman': string;
'ru': string;
'rugby_football': string;
'runner': string;
'running': string;
'running_man': string;
'running_shirt_with_sash': string;
'running_woman': string;
'rwanda': string;
'sa': string;
'sagittarius': string;
'sailboat': string;
'sake': string;
'samoa': string;
'san_marino': string;
'sandal': string;
'santa': string;
'sao_tome_principe': string;
'satellite': string;
'satisfied': string;
'saudi_arabia': string;
'saxophone': string;
'school': string;
'school_satchel': string;
'scissors': string;
'scorpion': string;
'scorpius': string;
'scream': string;
'scream_cat': string;
'scroll': string;
'seat': string;
'secret': string;
'see_no_evil': string;
'seedling': string;
'selfie': string;
'senegal': string;
'serbia': string;
'seven': string;
'seychelles': string;
'shallow_pan_of_food': string;
'shamrock': string;
'shark': string;
'shaved_ice': string;
'sheep': string;
'shell': string;
'shield': string;
'shinto_shrine': string;
'ship': string;
'shipit': string;
'shirt': string;
'shit': string;
'shoe': string;
'shopping': string;
'shopping_cart': string;
'shower': string;
'shrimp': string;
'sierra_leone': string;
'signal_strength': string;
'singapore': string;
'sint_maarten': string;
'six': string;
'six_pointed_star': string;
'ski': string;
'skier': string;
'skull': string;
'skull_and_crossbones': string;
'sleeping': string;
'sleeping_bed': string;
'sleepy': string;
'slightly_frowning_face': string;
'slightly_smiling_face': string;
'slot_machine': string;
'slovakia': string;
'slovenia': string;
'small_airplane': string;
'small_blue_diamond': string;
'small_orange_diamond': string;
'small_red_triangle': string;
'small_red_triangle_down': string;
'smile': string;
'smile_cat': string;
'smiley': string;
'smiley_cat': string;
'smiling_imp': string;
'smirk': string;
'smirk_cat': string;
'smoking': string;
'snail': string;
'snake': string;
'sneezing_face': string;
'snowboarder': string;
'snowflake': string;
'snowman': string;
'snowman_with_snow': string;
'sob': string;
'soccer': string;
'solomon_islands': string;
'somalia': string;
'soon': string;
'sos': string;
'sound': string;
'south_africa': string;
'south_georgia_south_sandwich_islands': string;
'south_sudan': string;
'space_invader': string;
'spades': string;
'spaghetti': string;
'sparkle': string;
'sparkler': string;
'sparkles': string;
'sparkling_heart': string;
'speak_no_evil': string;
'speaker': string;
'speaking_head': string;
'speech_balloon': string;
'speedboat': string;
'spider': string;
'spider_web': string;
'spiral_calendar': string;
'spiral_notepad': string;
'spoon': string;
'squid': string;
'squirrel': string;
'sri_lanka': string;
'st_barthelemy': string;
'st_helena': string;
'st_kitts_nevis': string;
'st_lucia': string;
'st_pierre_miquelon': string;
'st_vincent_grenadines': string;
'stadium': string;
'star': string;
'star2': string;
'star_and_crescent': string;
'star_of_david': string;
'stars': string;
'station': string;
'statue_of_liberty': string;
'steam_locomotive': string;
'stew': string;
'stop_button': string;
'stop_sign': string;
'stopwatch': string;
'straight_ruler': string;
'strawberry': string;
'stuck_out_tongue': string;
'stuck_out_tongue_closed_eyes': string;
'stuck_out_tongue_winking_eye': string;
'studio_microphone': string;
'stuffed_flatbread': string;
'sudan': string;
'sun_behind_large_cloud': string;
'sun_behind_rain_cloud': string;
'sun_behind_small_cloud': string;
'sun_with_face': string;
'sunflower': string;
'sunglasses': string;
'sunny': string;
'sunrise': string;
'sunrise_over_mountains': string;
'surfer': string;
'surfing_man': string;
'surfing_woman': string;
'suriname': string;
'sushi': string;
'suspect': string;
'suspension_railway': string;
'swaziland': string;
'sweat': string;
'sweat_drops': string;
'sweat_smile': string;
'sweden': string;
'sweet_potato': string;
'swimmer': string;
'swimming_man': string;
'swimming_woman': string;
'switzerland': string;
'symbols': string;
'synagogue': string;
'syria': string;
'syringe': string;
'taco': string;
'tada': string;
'taiwan': string;
'tajikistan': string;
'tanabata_tree': string;
'tangerine': string;
'tanzania': string;
'taurus': string;
'taxi': string;
'tea': string;
'telephone': string;
'telephone_receiver': string;
'telescope': string;
'tennis': string;
'tent': string;
'thailand': string;
'thermometer': string;
'thinking': string;
'thought_balloon': string;
'three': string;
'thumbsdown': string;
'thumbsup': string;
'ticket': string;
'tickets': string;
'tiger': string;
'tiger2': string;
'timer_clock': string;
'timor_leste': string;
'tipping_hand_man': string;
'tipping_hand_woman': string;
'tired_face': string;
'tm': string;
'togo': string;
'toilet': string;
'tokelau': string;
'tokyo_tower': string;
'tomato': string;
'tonga': string;
'tongue': string;
'top': string;
'tophat': string;
'tornado': string;
'tr': string;
'trackball': string;
'tractor': string;
'traffic_light': string;
'train': string;
'train2': string;
'tram': string;
'triangular_flag_on_post': string;
'triangular_ruler': string;
'trident': string;
'trinidad_tobago': string;
'triumph': string;
'trolleybus': string;
'trollface': string;
'trophy': string;
'tropical_drink': string;
'tropical_fish': string;
'truck': string;
'trumpet': string;
'tshirt': string;
'tulip': string;
'tumbler_glass': string;
'tunisia': string;
'turkey': string;
'turkmenistan': string;
'turks_caicos_islands': string;
'turtle': string;
'tuvalu': string;
'tv': string;
'twisted_rightwards_arrows': string;
'two': string;
'two_hearts': string;
'two_men_holding_hands': string;
'two_women_holding_hands': string;
'u5272': string;
'u5408': string;
'u55b6': string;
'u6307': string;
'u6708': string;
'u6709': string;
'u6e80': string;
'u7121': string;
'u7533': string;
'u7981': string;
'u7a7a': string;
'uganda': string;
'uk': string;
'ukraine': string;
'umbrella': string;
'unamused': string;
'underage': string;
'unicorn': string;
'united_arab_emirates': string;
'unlock': string;
'up': string;
'upside_down_face': string;
'uruguay': string;
'us': string;
'us_virgin_islands': string;
'uzbekistan': string;
'v': string;
'vanuatu': string;
'vatican_city': string;
'venezuela': string;
'vertical_traffic_light': string;
'vhs': string;
'vibration_mode': string;
'video_camera': string;
'video_game': string;
'vietnam': string;
'violin': string;
'virgo': string;
'volcano': string;
'volleyball': string;
'vs': string;
'vulcan_salute': string;
'walking': string;
'walking_man': string;
'walking_woman': string;
'wallis_futuna': string;
'waning_crescent_moon': string;
'waning_gibbous_moon': string;
'warning': string;
'wastebasket': string;
'watch': string;
'water_buffalo': string;
'watermelon': string;
'wave': string;
'wavy_dash': string;
'waxing_crescent_moon': string;
'waxing_gibbous_moon': string;
'wc': string;
'weary': string;
'wedding': string;
'weight_lifting_man': string;
'weight_lifting_woman': string;
'western_sahara': string;
'whale': string;
'whale2': string;
'wheel_of_dharma': string;
'wheelchair': string;
'white_check_mark': string;
'white_circle': string;
'white_flag': string;
'white_flower': string;
'white_large_square': string;
'white_medium_small_square': string;
'white_medium_square': string;
'white_small_square': string;
'white_square_button': string;
'wilted_flower': string;
'wind_chime': string;
'wind_face': string;
'wine_glass': string;
'wink': string;
'wolf': string;
'woman': string;
'woman_artist': string;
'woman_astronaut': string;
'woman_cartwheeling': string;
'woman_cook': string;
'woman_facepalming': string;
'woman_factory_worker': string;
'woman_farmer': string;
'woman_firefighter': string;
'woman_health_worker': string;
'woman_judge': string;
'woman_juggling': string;
'woman_mechanic': string;
'woman_office_worker': string;
'woman_pilot': string;
'woman_playing_handball': string;
'woman_playing_water_polo': string;
'woman_scientist': string;
'woman_shrugging': string;
'woman_singer': string;
'woman_student': string;
'woman_teacher': string;
'woman_technologist': string;
'woman_with_turban': string;
'womans_clothes': string;
'womans_hat': string;
'women_wrestling': string;
'womens': string;
'world_map': string;
'worried': string;
'wrench': string;
'writing_hand': string;
'x': string;
'yellow_heart': string;
'yemen': string;
'yen': string;
'yin_yang': string;
'yum': string;
'zambia': string;
'zap': string;
'zero': string;
'zimbabwe': string;
'zipper_mouth_face': string;
'zzz': string; };

export type Event = { 'id': string;
'type': string;
'actor': OrganizationSlug2;
'repo': RepoSlug;
'payload': { 'member': User;
'action': string; };
'public': boolean;
'created_at': string;
'org': OrganizationSlug3; };

export type FileContents = { 'filename': string;
'type': string;
'language': string;
'raw_url': string;
'size': number;
'truncated': boolean;
'content': string; };

export type FileSlug = { 'filename': string;
'type': string;
'language': string;
'raw_url': string;
'size': number; };

export type GitBlob = { 'sha': string;
'url': string; };

export type GitBranch = { 'name': string;
'commit': GitBlob; };

export type GitCommit = { 'sha': string;
'url': string;
'html_url': string;
'author': UserSlug;
'committer': UserSlug;
'tree': GitBlob;
'message': string;
'parents': CommitSlugMaybe[]; };

export type GitPatch = { 'sha': string;
'filename': string;
'status': string;
'additions': number;
'deletions': number;
'changes': number;
'blob_url': string;
'raw_url': string;
'contents_url': string;
'patch': string; };

export type GitRef = { 'ref': string;
'url': string;
'object': { 'sha': string;
'type': string;
'url': string; }; };

export type Issue = { 'url': string;
'repository_url': string;
'labels_url': string;
'comments_url': string;
'events_url': string;
'html_url': string;
'id': number;
'number': number;
'title': string;
'user': User;
'labels': any[];
'state': string;
'locked': boolean;
'assignee'?: any;
'assignees': any[];
'milestone'?: any;
'comments': number;
'created_at': string;
'updated_at': string;
'closed_at': string;
'body'?: any;
'closed_by': User; };

export type IssueComment = { 'url': string;
'html_url': string;
'issue_url': string;
'id': number;
'user': User;
'created_at': string;
'updated_at': string;
'body': string; };

export type IssueLabel = { 'id': number;
'url': string;
'name': string;
'color': string;
'default': boolean; };

export type Organization = { 'login': string;
'id': number;
'url': string;
'repos_url': string;
'events_url': string;
'hooks_url': string;
'issues_url': string;
'members_url': string;
'public_members_url': string;
'avatar_url': string;
'description'?: any;
'has_organization_projects': boolean;
'has_repository_projects': boolean;
'public_repos': number;
'public_gists': number;
'followers': number;
'following': number;
'html_url': string;
'created_at': string;
'updated_at': string;
'type': string;
'total_private_repos': number;
'owned_private_repos': number;
'private_gists': number;
'disk_usage': number;
'collaborators': number;
'billing_email': string;
'plan': { 'name': string;
'space': number;
'private_repos': number;
'filled_seats': number;
'seats': number; };
'default_repository_permission': string;
'members_can_create_repositories'?: any; };

export type OrganizationSlug = { 'login': string;
'id': number;
'url': string;
'repos_url': string;
'events_url': string;
'hooks_url': string;
'issues_url': string;
'members_url': string;
'public_members_url': string;
'avatar_url': string;
'description': string; };

export type OrganizationSlug2 = { 'id': number;
'login': string;
'display_login': string;
'gravatar_id': string;
'url': string;
'avatar_url': string; };

export type OrganizationSlug3 = { 'id': number;
'login': string;
'gravatar_id': string;
'url': string;
'avatar_url': string; };

export type PullRequest = { 'url': string;
'repository_url': string;
'labels_url': string;
'comments_url': string;
'events_url': string;
'html_url': string;
'id': number;
'number': number;
'title': string;
'user': User;
'labels': any[];
'state': string;
'locked': boolean;
'assignee'?: any;
'assignees': any[];
'milestone'?: any;
'comments': number;
'created_at': string;
'updated_at': string;
'closed_at'?: any;
'pull_request': CommitDiffSlug;
'body': string; };

export type RepoComment = { 'url': string;
'html_url': string;
'id': number;
'user': User;
'position': number;
'line': number;
'path': string;
'commit_id': string;
'created_at': string;
'updated_at': string;
'body': string; };

export type RepoCommit = { 'sha': string;
'commit': GitCommit;
'url': string;
'html_url': string;
'comments_url': string;
'author': User;
'committer': User;
'parents': CommitSlugMaybe[];
'stats': { 'total': number;
'additions': number;
'deletions': number; };
'files': GitPatch[]; };

export type RepoCommitMaybe = { 'sha': string;
'commit': GitCommit;
'url': string;
'html_url': string;
'comments_url': string;
'author': User;
'committer': User;
'parents': CommitSlugMaybe[]; };

export type RepoFileContents = { 'name': string;
'path': string;
'sha': string;
'size': number;
'url': string;
'html_url': string;
'git_url': string;
'download_url': string;
'type': string;
'content': string;
'encoding': string;
'_links': { 'self': string;
'git': string;
'html': string; }; };

export type RepoSlug = { 'id': number;
'name': string;
'url': string; };

export type RepoSubscription = { 'subscribed': boolean;
'ignored': boolean;
'reason'?: any;
'created_at': string;
'url': string;
'repository_url': string; };

export type Repository = { 'id': number;
'name': string;
'full_name': string;
'owner': User;
'private': boolean;
'html_url': string;
'description': string;
'fork': boolean;
'url': string;
'forks_url': string;
'keys_url': string;
'collaborators_url': string;
'teams_url': string;
'hooks_url': string;
'issue_events_url': string;
'events_url': string;
'assignees_url': string;
'branches_url': string;
'tags_url': string;
'blobs_url': string;
'git_tags_url': string;
'git_refs_url': string;
'trees_url': string;
'statuses_url': string;
'languages_url': string;
'stargazers_url': string;
'contributors_url': string;
'subscribers_url': string;
'subscription_url': string;
'commits_url': string;
'git_commits_url': string;
'comments_url': string;
'issue_comment_url': string;
'contents_url': string;
'compare_url': string;
'merges_url': string;
'archive_url': string;
'downloads_url': string;
'issues_url': string;
'pulls_url': string;
'milestones_url': string;
'notifications_url': string;
'labels_url': string;
'releases_url': string;
'deployments_url': string;
'created_at': string;
'updated_at': string;
'pushed_at': string;
'git_url': string;
'ssh_url': string;
'clone_url': string;
'svn_url': string;
'homepage'?: any;
'size': number;
'stargazers_count': number;
'watchers_count': number;
'language': string;
'has_issues': boolean;
'has_projects': boolean;
'has_downloads': boolean;
'has_wiki': boolean;
'has_pages': boolean;
'forks_count': number;
'mirror_url'?: any;
'open_issues_count': number;
'forks': number;
'open_issues': number;
'watchers': number;
'default_branch': string;
'permissions': { 'admin': boolean;
'push': boolean;
'pull': boolean; }; };

export type SearchResult = { 'total_count': number;
'incomplete_results': boolean;
'items': User[]; };

export type User = { 'login': string;
'id': number;
'avatar_url': string;
'gravatar_id': string;
'url': string;
'html_url': string;
'followers_url': string;
'following_url': string;
'gists_url': string;
'starred_url': string;
'subscriptions_url': string;
'organizations_url': string;
'repos_url': string;
'events_url': string;
'received_events_url': string;
'type': string;
'site_admin': boolean; };

export type UserSlug = { 'name': string;
'email': string;
'date': string; };


  // Input Param Types
  export type OctokatAuthorizationsFnPatchParams = { add_scopes?: String[];
remove_scopes?: String[]; }
export type OctokatAuthorizationsClientsPutParams = { client_secret: String; }
export type OctokatAuthorizationsPostParams = { client_secret?: String; }
export type OctokatReposIssuesFnAssigneesPostParams = { assignees: String[]; }
export type OctokatReposIssuesFnLabelsFnDeleteParams = { name: String; }
export type OctokatReposIssuesFnLabelsPostParams = { labels: String[]; }
export type OctokatReposIssuesFnLabelsPutParams = { labels: String[]; }
export type OctokatReposIssuesFnReactionsGetParams = { content?: String; }
export type OctokatReposIssuesFnReactionsPostParams = { content: String; }
export type OctokatReposIssuesFnPatchParams = { title?: String;
body?: String;
assignee?: String;
state?: String;
milestone?: Number;
labels?: String[]; }
export type OctokatReposIssuesCommentsFnReactionsGetParams = { content?: String; }
export type OctokatReposIssuesCommentsFnReactionsPostParams = { content: String; }
export type OctokatReposIssuesCommentsGetParams = { sort?: String; }
export type OctokatReposIssuesGetParams = { milestone?: String;
state?: String;
assignee?: String;
creator?: String;
mentioned?: String;
labels?: String;
sort?: String; }
export type OctokatReposIssuesPostParams = { title: String;
body?: String;
assignee?: String;
milestone?: Number;
labels?: String[]; }
export type OctokatReposNotificationsGetParams = { all?: Boolean;
participating?: Boolean;
before?: String; }
export type OctokatReposNotificationsPutParams = { last_read_at?: String; }
export type OctokatReposSubscriptionPutParams = { subscribed?: Boolean;
ignored?: Boolean; }
export type OctokatReposGitBlobsPostParams = { content: String;
encoding: String; }
export type OctokatReposGitCommitsPostParams = { message: String;
tree: String;
parents: String[];
author?: Object;
committer?: Object; }
export type OctokatReposGitRefsFnPatchParams = { force?: Boolean; }
export type OctokatReposGitRefsPostParams = { ref: String; }
export type OctokatReposGitTagsPostParams = { tag: String;
message: String;
object: String;
type: String;
tagger: Object; }
export type OctokatReposGitTreesFnGetParams = { recursive?: Boolean; }
export type OctokatReposGitTreesPostParams = { tree: Object;
base_tree?: String; }
export type OctokatReposAssigneesFnGetParams = { assignee: String; }
export type OctokatReposLabelsFnPatchParams = { name: String; }
export type OctokatReposMilestonesFnPatchParams = { title: String;
due_on?: Date; }
export type OctokatReposMilestonesGetParams = { sort?: String;
direction?: String; }
export type OctokatReposMilestonesPostParams = { title: String;
due_on?: Date; }
export type OctokatReposImportAuthorsFnPatchParams = { author_id: String;
email?: String;
name?: String; }
export type OctokatReposImportAuthorsGetParams = { since?: String; }
export type OctokatReposImportPutParams = { vcs_url: String;
vcs?: String;
vcs_username?: String;
vcs_password?: String;
tfvc_project?: String; }
export type OctokatReposProjectsPostParams = { body?: String; }
export type OctokatReposPullsFnMergePutParams = { commit_title?: String;
commit_message?: String;
sha?: String;
merge_method?: String; }
export type OctokatReposPullsFnReviewsFnEventsPostParams = { body?: String;
event?: String; }
export type OctokatReposPullsFnReviewsFnDismissalsPutParams = { message?: String; }
export type OctokatReposPullsFnReviewsPostParams = { body?: String;
event?: String;
comments?: String[];
path?: String;
position?: Number; }
export type OctokatReposPullsFnCommentsPostParams = { in_reply_to: Number; }
export type OctokatReposPullsFnRequestedReviewersPostParams = { reviewers?: String[]; }
export type OctokatReposPullsFnRequestedReviewersDeleteParams = { reviewers?: String[]; }
export type OctokatReposPullsFnPatchParams = { title?: String;
body?: String;
base?: String; }
export type OctokatReposPullsCommentsFnReactionsGetParams = { content?: String; }
export type OctokatReposPullsCommentsFnReactionsPostParams = { content: String; }
export type OctokatReposPullsCommentsGetParams = { sort?: String; }
export type OctokatReposPullsGetParams = { state?: String;
head?: String;
base?: String;
sort?: String; }
export type OctokatReposPullsPostParams = { issue: Number; }
export type OctokatReposCommentsFnReactionsGetParams = { content?: String; }
export type OctokatReposCommentsFnReactionsPostParams = { content: String; }
export type OctokatReposContributorsGetParams = { anon?: Boolean; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPostParams = { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPutParams = { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksContextsDeleteParams = { contexts: String[]; }
export type OctokatReposBranchesFnProtectionRequiredStatusChecksPatchParams = { include_admins?: Boolean;
strict?: Boolean;
contexts?: String[]; }
export type OctokatReposBranchesFnProtectionRequiredPullRequestReviewsPatchParams = { include_admins?: Boolean; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsPostParams = { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsPutParams = { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsTeamsDeleteParams = { teams: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersPostParams = { users: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersPutParams = { users: String[]; }
export type OctokatReposBranchesFnProtectionRestrictionsUsersDeleteParams = { users: String[]; }
export type OctokatReposBranchesFnProtectionPutParams = { required_status_checks: Object;
required_pull_request_reviews: Object;
restrictions: Object; }
export type OctokatReposBranchesGetParams = { protected?: Boolean; }
export type OctokatReposCollaboratorsFnPutParams = { permission?: String; }
export type OctokatReposCollaboratorsGetParams = { affiliation?: String; }
export type OctokatReposCommitsFnCommentsGetParams = { ref: String; }
export type OctokatReposCommitsFnStatusesGetParams = { ref: String; }
export type OctokatReposCommitsFnStatusGetParams = { ref: String; }
export type OctokatReposCommitsGetParams = { sha?: String;
path?: String;
author?: String; }
export type OctokatReposReadmeGetParams = { ref?: String; }
export type OctokatReposContentsGetParams = { path: String;
ref?: String; }
export type OctokatReposContentsPutParams = { path: String;
message: String;
content: String;
sha: String;
branch?: String;
committer?: Object; }
export type OctokatReposContentsDeleteParams = { path: String;
message: String;
sha: String;
branch?: String;
committer?: Object; }
export type OctokatReposTarballGetParams = { ref?: String; }
export type OctokatReposZipballGetParams = { ref?: String; }
export type OctokatReposKeysPostParams = { read_only?: Boolean; }
export type OctokatReposDeploymentsFnStatusesPostParams = { state?: String;
target_url?: String;
log_url?: String;
description?: String;
environment_url?: String;
auto_inactive?: Boolean; }
export type OctokatReposDeploymentsGetParams = { sha?: String;
ref?: String;
task?: String;
environment?: String; }
export type OctokatReposDeploymentsPostParams = { ref: String;
task?: String;
auto_merge?: Boolean;
required_contexts?: String[];
payload?: String;
environment?: String;
description?: String;
transient_environment?: Boolean;
production_environment?: Boolean; }
export type OctokatReposForksGetParams = { sort?: String; }
export type OctokatReposForksPostParams = { organization?: String; }
export type OctokatReposMergesPostParams = { commit_message?: String; }
export type OctokatReposReleasesFnAssetsPostParams = { filePath: String;
name: String;
label?: String; }
export type OctokatReposReleasesFnPatchParams = { tag_name: String;
target_commitish?: String;
name?: String;
body?: String;
draft?: Boolean;
prerelease?: Boolean; }
export type OctokatReposReleasesTagsGetParams = { tag: String; }
export type OctokatReposReleasesAssetsPatchParams = { label?: String; }
export type OctokatReposReleasesPostParams = { tag_name: String;
target_commitish?: String;
name?: String;
body?: String;
draft?: Boolean;
prerelease?: Boolean; }
export type OctokatReposStatusesPostParams = { state: String;
target_url?: String;
description?: String;
context?: String; }
export type OctokatReposHooksFnPatchParams = { config: Object;
events?: String[];
add_events?: String[];
remove_events?: String[];
active?: Boolean; }
export type OctokatReposHooksPostParams = { config: Object;
events?: String[];
active?: Boolean; }
export type OctokatReposPatchParams = { allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatOrgsIssuesGetParams = { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatOrgsMigrationsFnReposLockDeleteParams = { repo_name: String; }
export type OctokatOrgsMigrationsPostParams = { repositories: String[];
lock_repositories?: Boolean;
exclude_attachments?: Boolean; }
export type OctokatOrgsMembersGetParams = { filter?: String;
role?: String; }
export type OctokatOrgsMembershipsPutParams = { role: String; }
export type OctokatOrgsTeamsPostParams = { description?: String;
maintainers?: String[];
repo_names?: String[]; }
export type OctokatOrgsHooksFnPatchParams = { config: Object;
events?: String[];
active?: Boolean; }
export type OctokatOrgsHooksPostParams = { name: String;
config: Object;
events?: String[];
active?: Boolean; }
export type OctokatOrgsProjectsPostParams = { body?: String; }
export type OctokatOrgsReposGetParams = { type?: String; }
export type OctokatOrgsReposPostParams = { team_id?: Number;
allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatOrgsPatchParams = { billing_email?: String;
company?: String;
email?: String;
location?: String;
name?: String;
description?: String;
default_repository_permission?: String;
members_can_create_repositories?: Boolean; }
export type OctokatUsersFnStarredGetParams = { sort?: String; }
export type OctokatUsersFnReposGetParams = { type?: String;
sort?: String; }
export type OctokatUsersFnFollowingFnGetParams = { target_user: String; }
export type OctokatUsersGetParams = { since?: Number; }
export type OctokatNotificationsThreadsSubscriptionPutParams = { subscribed?: Boolean;
ignored?: Boolean; }
export type OctokatNotificationsGetParams = { all?: Boolean;
participating?: Boolean;
before?: String; }
export type OctokatNotificationsPutParams = { last_read_at?: String; }
export type OctokatUserStarredGetParams = { sort?: String; }
export type OctokatUserIssuesGetParams = { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatUserReposGetParams = { visibility?: String;
affiliation?: String;
type?: String;
sort?: String; }
export type OctokatUserReposPostParams = { team_id?: Number;
allow_squash_merge?: Boolean;
allow_merge_commit?: Boolean;
allow_rebase_merge?: Boolean; }
export type OctokatUserMembershipsOrgsFnPatchParams = { state: String; }
export type OctokatUserMembershipsOrgsGetParams = { state?: String; }
export type OctokatUserEmailsPostParams = { emails: String[]; }
export type OctokatUserEmailsDeleteParams = { emails: String[]; }
export type OctokatUserGpgKeysPostParams = { armored_public_key: String; }
export type OctokatUserPatchParams = { name?: String;
email?: String;
blog?: String;
company?: String;
location?: String;
hireable?: Boolean;
bio?: String; }
export type OctokatGistsFnPatchParams = { content?: String;
filename?: String; }
export type OctokatGistsPostParams = { public: Boolean; }
export type OctokatIntegrationIdentityUserPostParams = { nonce?: String; }
export type OctokatInstallationsAccessTokensPostParams = { user_id?: String; }
export type OctokatInstallationRepositoriesGetParams = { user_id?: String; }
export type OctokatIssuesGetParams = { filter?: String;
state?: String;
labels?: String;
sort?: String; }
export type OctokatGitignoreTemplatesFnGetParams = { name: String; }
export type OctokatLicensesFnGetParams = { license: String; }
export type OctokatMarkdownPostParams = { text: String;
mode?: String;
context?: String; }
export type OctokatOrganizationsGetParams = { since?: String; }
export type OctokatTeamsMembersGetParams = { role?: String; }
export type OctokatTeamsMembershipsPutParams = { role?: String; }
export type OctokatTeamsReposFnPutParams = { permission?: String; }
export type OctokatTeamsPatchParams = { description?: String; }
export type OctokatProjectsFnPatchParams = { body?: String; }
export type OctokatProjectsColumnsFnCardsPostParams = { note?: String;
content_id?: String;
content_type?: String; }
export type OctokatProjectsColumnsFnMovesPostParams = { position: String; }
export type OctokatProjectsColumnsCardsMovesPostParams = { position: String;
column_id?: String; }
export type OctokatProjectsColumnsCardsPatchParams = { note?: String; }
export type OctokatRepositoriesFnInvitationsFnPatchParams = { permission?: String; }
export type OctokatRepositoriesGetParams = { since?: String; }
export type OctokatSearchRepositoriesGetParams = { sort?: String; }
export type OctokatSearchCodeGetParams = { sort?: String; }
export type OctokatSearchCommitsGetParams = { sort?: String; }
export type OctokatSearchIssuesGetParams = { sort?: String; }
export type OctokatSearchUsersGetParams = { sort?: String; }
export type OctokatLegacyUserEmailGetParams = { email: String; }
export type OctokatEnterpriseStatsGetParams = { type: String; }
export type OctokatAdminLdapUsersMappingPatchParams = { ldap_dn: String; }
export type OctokatAdminLdapTeamsMappingPatchParams = { team_id: Number;
ldap_dn: String; }
export type OctokatAdminLdapTeamsSyncPostParams = { team_id: Number; }
export type OctokatAdminPreReceiveEnvironmentsFnPatchParams = { name: String;
image_url: String; }
export type OctokatAdminPreReceiveEnvironmentsPostParams = { name: String;
image_url: String; }
export type OctokatAdminPreReceiveHooksFnPatchParams = { hook: Object; }
export type OctokatAdminPreReceiveHooksPostParams = { name: String;
script: String;
script_repository: Object;
environment: Object;
enforcement?: String;
allow_downstream_configuration?: Boolean; }
export type OctokatAdminOrganizationsPostParams = { login: String;
admin: String;
profile_name?: String; }
export type OctokatStaffIndexingJobsPostParams = { target: String; }

  export default class Octokat {
    constructor(options?: Object)
    

applications: { 
(client_id: any): { 


// Syntactic shortcut used here
tokens(access_token: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
remove(): Promise<any>
 }


 }
grants: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }
authorizations: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatAuthorizationsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

// Syntactic shortcut used here
clients(client_id: any): { 


add(params: OctokatAuthorizationsClientsPutParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatAuthorizationsPostParams): Promise<any>
 }
events: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
repos(owner: any, repo: any): { 

events: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
issues: { 
(number: any): { 

lock: { 


add(): Promise<any>
remove(): Promise<any>
 }
assignees: { 


create(params: OctokatReposIssuesFnAssigneesPostParams): Promise<any>
remove(): Promise<any>
 }
comments: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
events: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
labels: { 
(name: any): { 


remove(params: OctokatReposIssuesFnLabelsFnDeleteParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposIssuesFnLabelsPostParams): Promise<any>
add(params: OctokatReposIssuesFnLabelsPutParams): Promise<any>
remove(): Promise<any>
 }
timeline: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
reactions: { 


fetch(params?: OctokatReposIssuesFnReactionsGetParams): Promise<any>
fetchAll(params?: OctokatReposIssuesFnReactionsGetParams): Promise<any>
read(params?: OctokatReposIssuesFnReactionsGetParams): Promise<any>
readBinary(params?: OctokatReposIssuesFnReactionsGetParams): Promise<any>
create(params: OctokatReposIssuesFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<Issue>
fetchAll(): Promise<Issue>
read(): Promise<Issue>
readBinary(): Promise<Issue>
update(params?: OctokatReposIssuesFnPatchParams): Promise<Issue>
 }
events: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
comments: { 
(id: any): { 

reactions: { 


fetch(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<any>
fetchAll(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<any>
read(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<any>
readBinary(params?: OctokatReposIssuesCommentsFnReactionsGetParams): Promise<any>
create(params: OctokatReposIssuesCommentsFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposIssuesCommentsGetParams): Promise<any>
fetchAll(params?: OctokatReposIssuesCommentsGetParams): Promise<any>
read(params?: OctokatReposIssuesCommentsGetParams): Promise<any>
readBinary(params?: OctokatReposIssuesCommentsGetParams): Promise<any>
 }
fetch(params?: OctokatReposIssuesGetParams): Promise<any>
fetchAll(params?: OctokatReposIssuesGetParams): Promise<any>
read(params?: OctokatReposIssuesGetParams): Promise<any>
readBinary(params?: OctokatReposIssuesGetParams): Promise<any>
create(params: OctokatReposIssuesPostParams): Promise<Issue>
 }
notifications: { 


fetch(params?: OctokatReposNotificationsGetParams): Promise<any>
fetchAll(params?: OctokatReposNotificationsGetParams): Promise<any>
read(params?: OctokatReposNotificationsGetParams): Promise<any>
readBinary(params?: OctokatReposNotificationsGetParams): Promise<any>
add(params?: OctokatReposNotificationsPutParams): Promise<any>
 }
stargazers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
subscribers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
subscription: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatReposSubscriptionPutParams): Promise<any>
remove(): Promise<any>
 }
git: { 

blobs: { 
(sha: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

create(params: OctokatReposGitBlobsPostParams): Promise<any>
 }
commits: { 
(sha: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

create(params: OctokatReposGitCommitsPostParams): Promise<any>
 }
refs: { 
(ref: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposGitRefsFnPatchParams): Promise<any>
remove(): Promise<any>
 }
tags: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
create(params: OctokatReposGitRefsPostParams): Promise<any>
 }
tags: { 
(sha: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

create(params: OctokatReposGitTagsPostParams): Promise<any>
 }
trees: { 
(sha: any): { 


fetch(params?: OctokatReposGitTreesFnGetParams): Promise<any>
fetchAll(params?: OctokatReposGitTreesFnGetParams): Promise<any>
read(params?: OctokatReposGitTreesFnGetParams): Promise<any>
readBinary(params?: OctokatReposGitTreesFnGetParams): Promise<any>
 }

create(params: OctokatReposGitTreesPostParams): Promise<any>
 }

 }
assignees: { 
(assignee: any): { 


fetch(params: OctokatReposAssigneesFnGetParams): Promise<any>
fetchAll(params: OctokatReposAssigneesFnGetParams): Promise<any>
read(params: OctokatReposAssigneesFnGetParams): Promise<any>
readBinary(params: OctokatReposAssigneesFnGetParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
labels: { 
(name: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatReposLabelsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
milestones: { 
(number: any): { 

labels: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatReposMilestonesFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposMilestonesGetParams): Promise<any>
fetchAll(params?: OctokatReposMilestonesGetParams): Promise<any>
read(params?: OctokatReposMilestonesGetParams): Promise<any>
readBinary(params?: OctokatReposMilestonesGetParams): Promise<any>
create(params: OctokatReposMilestonesPostParams): Promise<any>
 }
import: { 

authors: { 
(author_id: any): { 


update(params: OctokatReposImportAuthorsFnPatchParams): Promise<any>
 }

fetch(params?: OctokatReposImportAuthorsGetParams): Promise<any>
fetchAll(params?: OctokatReposImportAuthorsGetParams): Promise<any>
read(params?: OctokatReposImportAuthorsGetParams): Promise<any>
readBinary(params?: OctokatReposImportAuthorsGetParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
add(params: OctokatReposImportPutParams): Promise<any>
remove(): Promise<any>
 }
license: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
projects: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatReposProjectsPostParams): Promise<any>
 }
pulls: { 
(number: any): { 

commits: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
files: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
merge: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatReposPullsFnMergePutParams): Promise<any>
 }
reviews: { 
(id: any): { 

comments: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
events: { 


create(params?: OctokatReposPullsFnReviewsFnEventsPostParams): Promise<any>
 }
dismissals: { 


add(params?: OctokatReposPullsFnReviewsFnDismissalsPutParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatReposPullsFnReviewsPostParams): Promise<any>
 }
comments: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposPullsFnCommentsPostParams): Promise<any>
 }
requestedReviewers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatReposPullsFnRequestedReviewersPostParams): Promise<any>
remove(params?: OctokatReposPullsFnRequestedReviewersDeleteParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposPullsFnPatchParams): Promise<any>
 }
comments: { 
(id: any): { 

reactions: { 


fetch(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<any>
fetchAll(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<any>
read(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<any>
readBinary(params?: OctokatReposPullsCommentsFnReactionsGetParams): Promise<any>
create(params: OctokatReposPullsCommentsFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposPullsCommentsGetParams): Promise<any>
fetchAll(params?: OctokatReposPullsCommentsGetParams): Promise<any>
read(params?: OctokatReposPullsCommentsGetParams): Promise<any>
readBinary(params?: OctokatReposPullsCommentsGetParams): Promise<any>
 }
fetch(params?: OctokatReposPullsGetParams): Promise<any>
fetchAll(params?: OctokatReposPullsGetParams): Promise<any>
read(params?: OctokatReposPullsGetParams): Promise<any>
readBinary(params?: OctokatReposPullsGetParams): Promise<any>
create(params: OctokatReposPullsPostParams): Promise<any>
 }
comments: { 
(id: any): { 

reactions: { 


fetch(params?: OctokatReposCommentsFnReactionsGetParams): Promise<any>
fetchAll(params?: OctokatReposCommentsFnReactionsGetParams): Promise<any>
read(params?: OctokatReposCommentsFnReactionsGetParams): Promise<any>
readBinary(params?: OctokatReposCommentsFnReactionsGetParams): Promise<any>
create(params: OctokatReposCommentsFnReactionsPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
contributors: { 


fetch(params?: OctokatReposContributorsGetParams): Promise<any>
fetchAll(params?: OctokatReposContributorsGetParams): Promise<any>
read(params?: OctokatReposContributorsGetParams): Promise<any>
readBinary(params?: OctokatReposContributorsGetParams): Promise<any>
 }
languages: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
teams: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
tags: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
branches: { 
(branch: any): { 

protection: { 

requiredStatusChecks: { 

contexts: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPostParams): Promise<any>
add(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsPutParams): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRequiredStatusChecksContextsDeleteParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposBranchesFnProtectionRequiredStatusChecksPatchParams): Promise<any>
remove(): Promise<any>
 }
requiredPullRequestReviews: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposBranchesFnProtectionRequiredPullRequestReviewsPatchParams): Promise<any>
remove(): Promise<any>
 }
restrictions: { 

teams: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposBranchesFnProtectionRestrictionsTeamsPostParams): Promise<any>
add(params: OctokatReposBranchesFnProtectionRestrictionsTeamsPutParams): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRestrictionsTeamsDeleteParams): Promise<any>
 }
users: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposBranchesFnProtectionRestrictionsUsersPostParams): Promise<any>
add(params: OctokatReposBranchesFnProtectionRestrictionsUsersPutParams): Promise<any>
remove(params: OctokatReposBranchesFnProtectionRestrictionsUsersDeleteParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params: OctokatReposBranchesFnProtectionPutParams): Promise<any>
remove(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(params?: OctokatReposBranchesGetParams): Promise<any>
fetchAll(params?: OctokatReposBranchesGetParams): Promise<any>
read(params?: OctokatReposBranchesGetParams): Promise<any>
readBinary(params?: OctokatReposBranchesGetParams): Promise<any>
 }
collaborators: { 
(username: any): { 

permission: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatReposCollaboratorsFnPutParams): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatReposCollaboratorsGetParams): Promise<any>
fetchAll(params?: OctokatReposCollaboratorsGetParams): Promise<any>
read(params?: OctokatReposCollaboratorsGetParams): Promise<any>
readBinary(params?: OctokatReposCollaboratorsGetParams): Promise<any>
 }
commits: { 
(ref: any): { 

comments: { 


fetch(params: OctokatReposCommitsFnCommentsGetParams): Promise<any>
fetchAll(params: OctokatReposCommitsFnCommentsGetParams): Promise<any>
read(params: OctokatReposCommitsFnCommentsGetParams): Promise<any>
readBinary(params: OctokatReposCommitsFnCommentsGetParams): Promise<any>
 }
statuses: { 


fetch(params: OctokatReposCommitsFnStatusesGetParams): Promise<any>
fetchAll(params: OctokatReposCommitsFnStatusesGetParams): Promise<any>
read(params: OctokatReposCommitsFnStatusesGetParams): Promise<any>
readBinary(params: OctokatReposCommitsFnStatusesGetParams): Promise<any>
 }
status: { 


fetch(params: OctokatReposCommitsFnStatusGetParams): Promise<any>
fetchAll(params: OctokatReposCommitsFnStatusGetParams): Promise<any>
read(params: OctokatReposCommitsFnStatusGetParams): Promise<any>
readBinary(params: OctokatReposCommitsFnStatusGetParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(params?: OctokatReposCommitsGetParams): Promise<any>
fetchAll(params?: OctokatReposCommitsGetParams): Promise<any>
read(params?: OctokatReposCommitsGetParams): Promise<any>
readBinary(params?: OctokatReposCommitsGetParams): Promise<any>
 }

// Syntactic shortcut used here
compare(base: any, head: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

readme: { 


fetch(params?: OctokatReposReadmeGetParams): Promise<any>
fetchAll(params?: OctokatReposReadmeGetParams): Promise<any>
read(params?: OctokatReposReadmeGetParams): Promise<any>
readBinary(params?: OctokatReposReadmeGetParams): Promise<any>
 }

// Syntactic shortcut used here
contents(path: any): { 


fetch(params: OctokatReposContentsGetParams): Promise<any>
fetchAll(params: OctokatReposContentsGetParams): Promise<any>
read(params: OctokatReposContentsGetParams): Promise<any>
readBinary(params: OctokatReposContentsGetParams): Promise<any>
add(params: OctokatReposContentsPutParams): Promise<any>
remove(params: OctokatReposContentsDeleteParams): Promise<any>
 }


// Syntactic shortcut used here
tarball(ref: any): { 


fetch(params?: OctokatReposTarballGetParams): Promise<any>
fetchAll(params?: OctokatReposTarballGetParams): Promise<any>
read(params?: OctokatReposTarballGetParams): Promise<any>
readBinary(params?: OctokatReposTarballGetParams): Promise<any>
 }


// Syntactic shortcut used here
zipball(ref: any): { 


fetch(params?: OctokatReposZipballGetParams): Promise<any>
fetchAll(params?: OctokatReposZipballGetParams): Promise<any>
read(params?: OctokatReposZipballGetParams): Promise<any>
readBinary(params?: OctokatReposZipballGetParams): Promise<any>
 }

keys: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatReposKeysPostParams): Promise<any>
 }
deployments: { 
(id: any): { 

statuses: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatReposDeploymentsFnStatusesPostParams): Promise<any>
 }

 }

fetch(params?: OctokatReposDeploymentsGetParams): Promise<any>
fetchAll(params?: OctokatReposDeploymentsGetParams): Promise<any>
read(params?: OctokatReposDeploymentsGetParams): Promise<any>
readBinary(params?: OctokatReposDeploymentsGetParams): Promise<any>
create(params: OctokatReposDeploymentsPostParams): Promise<any>
 }
downloads: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
forks: { 


fetch(params?: OctokatReposForksGetParams): Promise<any>
fetchAll(params?: OctokatReposForksGetParams): Promise<any>
read(params?: OctokatReposForksGetParams): Promise<any>
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
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
latest: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
releases: { 
(id: any): { 

assets: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposReleasesFnAssetsPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatReposReleasesFnPatchParams): Promise<any>
remove(): Promise<any>
 }
latest: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
tags(tag: any): { 


fetch(params: OctokatReposReleasesTagsGetParams): Promise<any>
fetchAll(params: OctokatReposReleasesTagsGetParams): Promise<any>
read(params: OctokatReposReleasesTagsGetParams): Promise<any>
readBinary(params: OctokatReposReleasesTagsGetParams): Promise<any>
 }


// Syntactic shortcut used here
assets(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposReleasesAssetsPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposReleasesPostParams): Promise<any>
 }
stats: { 

contributors: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
commitActivity: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
codeFrequency: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
participation: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
punchCard: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
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


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
paths: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }
views: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
clones: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
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
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatReposHooksFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatReposHooksPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatReposPatchParams): Promise<any>
remove(): Promise<any>
 }


// Syntactic shortcut used here
networks(owner: any, repo: any): { 

events: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }


// Syntactic shortcut used here
orgs(org: any): { 

events: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
issues: { 


fetch(params?: OctokatOrgsIssuesGetParams): Promise<any>
fetchAll(params?: OctokatOrgsIssuesGetParams): Promise<any>
read(params?: OctokatOrgsIssuesGetParams): Promise<any>
readBinary(params?: OctokatOrgsIssuesGetParams): Promise<any>
 }
migrations: { 
(id: any): { 

archive: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
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
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatOrgsMigrationsPostParams): Promise<any>
 }
members: { 
(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatOrgsMembersGetParams): Promise<any>
fetchAll(params?: OctokatOrgsMembersGetParams): Promise<any>
read(params?: OctokatOrgsMembersGetParams): Promise<any>
readBinary(params?: OctokatOrgsMembersGetParams): Promise<any>
 }
publicMembers: { 
(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
memberships(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params: OctokatOrgsMembershipsPutParams): Promise<any>
remove(): Promise<any>
 }

invitations: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
outsideCollaborators: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
outsideCollaborator(username: any): { 


add(): Promise<any>
remove(): Promise<any>
 }

teams: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatOrgsTeamsPostParams): Promise<any>
 }
hooks: { 
(id: any): { 

pings: { 


create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatOrgsHooksFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatOrgsHooksPostParams): Promise<any>
 }
blocks: { 
(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
projects: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatOrgsProjectsPostParams): Promise<any>
 }
repos: { 


fetch(params?: OctokatOrgsReposGetParams): Promise<any>
fetchAll(params?: OctokatOrgsReposGetParams): Promise<any>
read(params?: OctokatOrgsReposGetParams): Promise<any>
readBinary(params?: OctokatOrgsReposGetParams): Promise<any>
create(params?: OctokatOrgsReposPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatOrgsPatchParams): Promise<any>
 }

users: { 
(username: any): { 

receivedEvents: { 

public: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
events: { 

public: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

// Syntactic shortcut used here
orgs(org: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
starred: { 


fetch(params?: OctokatUsersFnStarredGetParams): Promise<any>
fetchAll(params?: OctokatUsersFnStarredGetParams): Promise<any>
read(params?: OctokatUsersFnStarredGetParams): Promise<any>
readBinary(params?: OctokatUsersFnStarredGetParams): Promise<any>
 }
subscriptions: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
gists: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
orgs: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
repos: { 


fetch(params?: OctokatUsersFnReposGetParams): Promise<any>
fetchAll(params?: OctokatUsersFnReposGetParams): Promise<any>
read(params?: OctokatUsersFnReposGetParams): Promise<any>
readBinary(params?: OctokatUsersFnReposGetParams): Promise<any>
 }
followers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
following: { 
(target_user: any): { 


fetch(params: OctokatUsersFnFollowingFnGetParams): Promise<any>
fetchAll(params: OctokatUsersFnFollowingFnGetParams): Promise<any>
read(params: OctokatUsersFnFollowingFnGetParams): Promise<any>
readBinary(params: OctokatUsersFnFollowingFnGetParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
keys: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
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
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(params?: OctokatUsersGetParams): Promise<any>
fetchAll(params?: OctokatUsersGetParams): Promise<any>
read(params?: OctokatUsersGetParams): Promise<any>
readBinary(params?: OctokatUsersGetParams): Promise<any>
 }
feeds: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
notifications: { 


// Syntactic shortcut used here
threads(id: any): { 

subscription: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatNotificationsThreadsSubscriptionPutParams): Promise<any>
remove(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
 }

fetch(params?: OctokatNotificationsGetParams): Promise<any>
fetchAll(params?: OctokatNotificationsGetParams): Promise<any>
read(params?: OctokatNotificationsGetParams): Promise<any>
readBinary(params?: OctokatNotificationsGetParams): Promise<any>
add(params?: OctokatNotificationsPutParams): Promise<any>
 }
user: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
starred: { 
(owner: any, repo: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(params?: OctokatUserStarredGetParams): Promise<any>
fetchAll(params?: OctokatUserStarredGetParams): Promise<any>
read(params?: OctokatUserStarredGetParams): Promise<any>
readBinary(params?: OctokatUserStarredGetParams): Promise<any>
 }
subscriptions: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
issues: { 


fetch(params?: OctokatUserIssuesGetParams): Promise<any>
fetchAll(params?: OctokatUserIssuesGetParams): Promise<any>
read(params?: OctokatUserIssuesGetParams): Promise<any>
readBinary(params?: OctokatUserIssuesGetParams): Promise<any>
 }
repos: { 


fetch(params?: OctokatUserReposGetParams): Promise<any>
fetchAll(params?: OctokatUserReposGetParams): Promise<any>
read(params?: OctokatUserReposGetParams): Promise<any>
readBinary(params?: OctokatUserReposGetParams): Promise<any>
create(params?: OctokatUserReposPostParams): Promise<any>
 }
orgs: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
memberships: { 

orgs: { 
(org: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatUserMembershipsOrgsFnPatchParams): Promise<any>
 }

fetch(params?: OctokatUserMembershipsOrgsGetParams): Promise<any>
fetchAll(params?: OctokatUserMembershipsOrgsGetParams): Promise<any>
read(params?: OctokatUserMembershipsOrgsGetParams): Promise<any>
readBinary(params?: OctokatUserMembershipsOrgsGetParams): Promise<any>
 }

 }
teams: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
emails: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatUserEmailsPostParams): Promise<any>
remove(params: OctokatUserEmailsDeleteParams): Promise<any>
 }
followers: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
following: { 
(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
keys: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
gpgKeys: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatUserGpgKeysPostParams): Promise<any>
 }
blocks: { 
(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
repositoryInvitations: { 
(invitation_id: any): { 


update(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatUserPatchParams): Promise<any>
 }
gists: { 
(id: any): { 

commits: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
star: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(): Promise<any>
remove(): Promise<any>
 }
forks: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
comments: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatGistsFnPatchParams): Promise<any>
remove(): Promise<any>
 }
public: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
starred: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatGistsPostParams): Promise<any>
 }
integration: { 

installations: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
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
fetchAll(params?: OctokatInstallationRepositoriesGetParams): Promise<any>
read(params?: OctokatInstallationRepositoriesGetParams): Promise<any>
readBinary(params?: OctokatInstallationRepositoriesGetParams): Promise<any>
 }

 }
issues: { 


fetch(params?: OctokatIssuesGetParams): Promise<any>
fetchAll(params?: OctokatIssuesGetParams): Promise<any>
read(params?: OctokatIssuesGetParams): Promise<any>
readBinary(params?: OctokatIssuesGetParams): Promise<any>
 }
emojis: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
gitignore: { 

templates: { 
(name: any): { 


fetch(params: OctokatGitignoreTemplatesFnGetParams): Promise<any>
fetchAll(params: OctokatGitignoreTemplatesFnGetParams): Promise<any>
read(params: OctokatGitignoreTemplatesFnGetParams): Promise<any>
readBinary(params: OctokatGitignoreTemplatesFnGetParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }
licenses: { 
(license: any): { 


fetch(params: OctokatLicensesFnGetParams): Promise<any>
fetchAll(params: OctokatLicensesFnGetParams): Promise<any>
read(params: OctokatLicensesFnGetParams): Promise<any>
readBinary(params: OctokatLicensesFnGetParams): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
markdown: { 

raw: { 


create(): Promise<any>
 }
create(params: OctokatMarkdownPostParams): Promise<any>
 }
meta: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
rateLimit: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
organizations: { 


fetch(params?: OctokatOrganizationsGetParams): Promise<any>
fetchAll(params?: OctokatOrganizationsGetParams): Promise<any>
read(params?: OctokatOrganizationsGetParams): Promise<any>
readBinary(params?: OctokatOrganizationsGetParams): Promise<any>
 }

// Syntactic shortcut used here
teams(id: any): { 

members: { 


fetch(params?: OctokatTeamsMembersGetParams): Promise<any>
fetchAll(params?: OctokatTeamsMembersGetParams): Promise<any>
read(params?: OctokatTeamsMembersGetParams): Promise<any>
readBinary(params?: OctokatTeamsMembersGetParams): Promise<any>
 }

// Syntactic shortcut used here
memberships(username: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatTeamsMembershipsPutParams): Promise<any>
remove(): Promise<any>
 }

repos: { 
(owner: any, repo: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
add(params?: OctokatTeamsReposFnPutParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
invitations: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatTeamsPatchParams): Promise<any>
remove(): Promise<any>
 }

projects: { 
(id: any): { 

columns: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params?: OctokatProjectsFnPatchParams): Promise<any>
remove(): Promise<any>
 }
columns: { 
(id: any): { 

cards: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params?: OctokatProjectsColumnsFnCardsPostParams): Promise<any>
 }
moves: { 


create(params: OctokatProjectsColumnsFnMovesPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(): Promise<any>
remove(): Promise<any>
 }

// Syntactic shortcut used here
cards(id: any): { 

moves: { 


create(params: OctokatProjectsColumnsCardsMovesPostParams): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
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
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

 }
invitations: { 
(invitation_id: any): { 


update(params?: OctokatRepositoriesFnInvitationsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }

fetch(params?: OctokatRepositoriesGetParams): Promise<any>
fetchAll(params?: OctokatRepositoriesGetParams): Promise<any>
read(params?: OctokatRepositoriesGetParams): Promise<any>
readBinary(params?: OctokatRepositoriesGetParams): Promise<any>
 }
search: { 

repositories: { 


fetch(params?: OctokatSearchRepositoriesGetParams): Promise<any>
fetchAll(params?: OctokatSearchRepositoriesGetParams): Promise<any>
read(params?: OctokatSearchRepositoriesGetParams): Promise<any>
readBinary(params?: OctokatSearchRepositoriesGetParams): Promise<any>
 }
code: { 


fetch(params?: OctokatSearchCodeGetParams): Promise<any>
fetchAll(params?: OctokatSearchCodeGetParams): Promise<any>
read(params?: OctokatSearchCodeGetParams): Promise<any>
readBinary(params?: OctokatSearchCodeGetParams): Promise<any>
 }
commits: { 


fetch(params?: OctokatSearchCommitsGetParams): Promise<any>
fetchAll(params?: OctokatSearchCommitsGetParams): Promise<any>
read(params?: OctokatSearchCommitsGetParams): Promise<any>
readBinary(params?: OctokatSearchCommitsGetParams): Promise<any>
 }
issues: { 


fetch(params?: OctokatSearchIssuesGetParams): Promise<any>
fetchAll(params?: OctokatSearchIssuesGetParams): Promise<any>
read(params?: OctokatSearchIssuesGetParams): Promise<any>
readBinary(params?: OctokatSearchIssuesGetParams): Promise<any>
 }
users: { 


fetch(params?: OctokatSearchUsersGetParams): Promise<any>
fetchAll(params?: OctokatSearchUsersGetParams): Promise<any>
read(params?: OctokatSearchUsersGetParams): Promise<any>
readBinary(params?: OctokatSearchUsersGetParams): Promise<any>
 }

 }
legacy: { 

user: { 


// Syntactic shortcut used here
email(email: any): { 


fetch(params: OctokatLegacyUserEmailGetParams): Promise<any>
fetchAll(params: OctokatLegacyUserEmailGetParams): Promise<any>
read(params: OctokatLegacyUserEmailGetParams): Promise<any>
readBinary(params: OctokatLegacyUserEmailGetParams): Promise<any>
 }


 }

 }
enterprise: { 


// Syntactic shortcut used here
stats(type: any): { 


fetch(params: OctokatEnterpriseStatsGetParams): Promise<any>
fetchAll(params: OctokatEnterpriseStatsGetParams): Promise<any>
read(params: OctokatEnterpriseStatsGetParams): Promise<any>
readBinary(params: OctokatEnterpriseStatsGetParams): Promise<any>
 }

settings: { 

license: { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
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
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }
create(): Promise<any>
 }
fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatAdminPreReceiveEnvironmentsFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
create(params: OctokatAdminPreReceiveEnvironmentsPostParams): Promise<any>
 }
preReceiveHooks: { 
(id: any): { 


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
update(params: OctokatAdminPreReceiveHooksFnPatchParams): Promise<any>
remove(): Promise<any>
 }

fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
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


fetch(): Promise<any>
fetchAll(): Promise<any>
read(): Promise<any>
readBinary(): Promise<any>
 }


  }
}
