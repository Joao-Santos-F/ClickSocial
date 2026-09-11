import { StyleSheet } from "react-native";

export const DetalhePostStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    width: "100%",
  },

  card: {
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    backgroundColor: "#F4F0FA",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerIconBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  headerTitle: {
    color: "#1B172B",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  headerPlaceholder: {
    width: 32,
  },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: "#E2E0EC",
  },
  authorInfo: {
    justifyContent: "center",
  },
  authorName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1B172B",
  },
  authorUsername: {
    fontSize: 12,
    color: "#6E6A82",
    marginTop: 1,
  },
  authorTime: {
    fontSize: 11,
    color: "#A3A0B3",
    marginTop: 1,
  },

  postText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1B172B",
    lineHeight: 22,
    marginBottom: 16,
  },

  imageContainer: {
    width: 190,
    height: 190,
    maxWidth: "100%",
    borderRadius: 14,
    backgroundColor: "#000000",
    alignSelf: "center",
    marginBottom: 14,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  postImage: {
    width: 190,
    height: 190,
    maxWidth: "100%",
    maxHeight: "100%",
  },

  likesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 2,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingRight: 6,
  },
  heartIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  likesCount: {
    fontSize: 14,
    color: "#6E6A82",
    marginLeft: 6,
    fontWeight: "500",
  },

  commentsButton: {
    paddingVertical: 4,
  },
  commentsText: {
    fontSize: 14,
    color: "#8E8A9E",
  },

  // Seção de comentários expandida
  commentsContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E0EC",
    paddingTop: 12,
  },
  commentItem: {
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1B172B",
  },
  commentBody: {
    fontSize: 12,
    color: "#4A4660",
  },
  commentInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E0EC",
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 13,
    color: "#1B172B",
    marginRight: 8,
  },
  commentSendBtn: {
    backgroundColor: "#110D20",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  commentSendText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default DetalhePostStyles;
