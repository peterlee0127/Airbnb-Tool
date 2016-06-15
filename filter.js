function removeUnusedInfo(info) {
    delete info.square_feet;
    delete info.security_price_native;
    delete info.photos;
    delete info.picture_captions;
    delete info.xl_picture_urls;
    delete info.thumbnail_urls;
    delete info.amenities_ids;
    delete info.medium_url;
    delete info.allowed_currencies;
    delete info.recent_review;
    delete info.additional_house_rules;
    delete info.weekly_price_native;
    delete info.weekly_price_factor;
    delete info.transit;
    delete info.notes;
    delete info.neighborhood_overview;
    delete info.monthly_price_native;
    delete info.monthly_price_factor;
    delete info.security_deposit_native;
    delete info.security_deposit_formatted;
    delete info.instant_book_welcome_message;
    delete info.house_rules;
    delete info.listing_weekly_price_native;
    delete info.listing_weekend_price_native;
    delete info.listing_security_deposit_native;
    delete info.listing_price_for_extra_person_native;
    delete info.listing_monthly_price_native;
    delete info.description;
    delete info.primary_host;
    delete info.picture_urls;
    delete info.picture_count;
    delete info.hosts;
    delete info.user;
    delete info.thumbnail_url;
    delete info.picture_url;
    delete info.price_native;
    delete info.price_formatted;
    delete info.price;
    delete info.native_currency;
    delete info.currency_symbol_left;
    delete info.public_address;
    delete info.is_location_exact;
    delete info.interaction;
    delete info.has_viewed_terms;
    delete info.has_viewed_ib_perf_dashboard_panel;
    delete info.jurisdiction_rollout_names;
    delete info.jurisdiction_names;
    delete info.extra_user_info;
    delete info.currency_symbol_right;
    delete info.has_agreed_to_legal_terms;
    delete info.listing_cleaning_fee_native;
    delete info.has_viewed_cleaning;
    delete info.has_license;
    delete info.license;
    delete info.requires_license;
    delete info.require_guest_phone_verification;
    delete info.require_guest_profile_picture;
    delete info.force_mobile_legal_modal;
    delete info.listing_native_currency;
    delete info.market;
    delete info.smart_location;
    delete info.id;
    delete info.has_double_blind_reviews;
    delete info.cancel_policy_short_str;
    delete info.cancel_policy;
    delete info.summary;
    delete info.map_image_url;
    return info;
}
function removeHTML(info) {
    delete info.pagination_footer;
    delete info.results;
    delete info.filters;
    return info;   
}
function removeUnusedCalendarInfo(info) {
    var result = info.calendar_months[0].days;
    var dayCount = result.length;
    var date = new Date();
    var array = [];
    for(var i=0;i<dayCount;i++) {
        delete result[i].price.native_currency;
        delete result[i].price.native_price;
        delete result[i].price.date;
        delete result[i].price.type;
        var parseDate = new Date(result[i].date);
//        if(parseDate<date) {
            result[i].price = result[i].price.local_price;
            delete result[i].price.local_price;
            array.push(result[i]);
  //      }
    }
    return array;
} 

function removeUnusedReviewInfo(info) {
    var array = [];
    var reviews = info.reviews;
    for(var i=0,max=reviews.length;i<max;i++) {
        var author_id = reviews[i].author_id;
        var comments = reviews[i].comments;
        var created_at = reviews[i].created_at;
        array.push({
            'created_at':created_at,
            'author_id':author_id,
            'comments':comments
        })
    }
    return array;
}

exports.removeHTML       = removeHTML;
exports.removeUnusedInfo = removeUnusedInfo;
exports.removeUnusedCalendarInfo = removeUnusedCalendarInfo;
exports.removeUnusedReviewInfo = removeUnusedReviewInfo;
