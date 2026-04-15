import React, { useCallback, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import Icon from "@expo/vector-icons/SimpleLineIcons";

import { Languages } from "@lib/common";
// import CustomAPI from '@services/CustomAPI';
import { toast } from "@lib/Omni";
// import {useAppSelector} from '@redux/hooks';

import { selectAccessToken } from "@/features/auth/store/auth-selector";
import { useAppSelector } from "@/lib/store/useRedux";
import StarRatingComponent from "./StarRating";
import css from "./styles";

export interface ReviewProps {
  post: { id: number | string; title?: string };
}

const Review: React.FC<ReviewProps> = ({ post }) => {
  // const cookie = useAppSelector(state => state.user.token);
  const cookie = useAppSelector(selectAccessToken);

  const [txtComment, setTxtComment] = useState("");
  const [starCount, setStarCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const submitComment = useCallback(() => {
    setSubmitting(true);

    if (txtComment == "") {
      toast(Languages.errInputComment);
      setSubmitting(false);
      return;
    }
    if (starCount == 0) {
      toast(Languages.errRatingComment);
      setSubmitting(false);
      return;
    }

    const commentData = {
      post_id: post.id,
      content: txtComment,
      cookie,
      meta: JSON.stringify({
        rating: starCount,
        verified: 0,
      }),
    };

    // CustomAPI.createComment(commentData).then(data => {
    //   if (data.status == 'ok') {
    //     setTxtComment('');
    //     toast(Languages.thanksForReview);
    //     Events.closeModalReview();
    //   } else {
    //     toast(data?.message || '');
    //   }
    //   setSubmitting(false);
    // });
  }, [txtComment, starCount, cookie, post]);

  const renderStatusRate = (value: any) => {
    switch (value) {
      case 1:
        return "Terrible";
      case 2:
        return "Poor";
      case 3:
        return "Average";
      case 4:
        return "Very Good";
      case 5:
        return "Exceptional";
      default:
        return "Average";
    }
  };

  const renderCommentInput = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={css.rowHead}>
          <Text style={css.headText}>{Languages.yourcomment}</Text>
        </View>
        <View style={css.inputCommentWrap}>
          <TextInput
            style={css.inputCommentText}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            multiline
            value={txtComment}
            onChangeText={(text) => setTxtComment(text)}
            placeholder={Languages.placeComment}
            onSubmitEditing={submitComment}
          />
          <TouchableOpacity
            disabled={submitting}
            onPress={submitComment}
            style={css.sendView}
          >
            <Icon
              name="cursor"
              size={16}
              color="white"
              style={css.sendButton}
            />
            <Text style={css.sendText}>{Languages.send}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={css.wrapComment}>
      <Text style={css.headCommentText}>{Languages.comment}</Text>
      <View style={css.fullWidth}>
        <View style={css.wrapRating}>
          <StarRatingComponent
            rating={starCount}
            onChange={(star: number) => setStarCount(star)}
          />
        </View>
        <View style={css.besideStar}>
          <View style={css.statusRate}>
            <Text style={css.textStatusRate}>
              {renderStatusRate(starCount)}
            </Text>
          </View>
        </View>
      </View>
      {renderCommentInput()}
    </View>
  );
};
// Review.defaultProps = {};

export default Review;
