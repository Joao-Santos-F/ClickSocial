import { StyleSheet, Platform } from "react-native";

export const CriaPost = StyleSheet.create({
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

  Card: {
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
    marginBottom: 18,
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
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  headerPlaceholder: {
    width: 32,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1B172B",
    marginBottom: 8,
  },

  textArea: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E0EC",
    padding: 12,
    height: 80,
    maxHeight: 90,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#1B172B",
    marginBottom: 8,
  },

  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#E5E0F0",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: "#211645",
    fontWeight: "600",
    marginRight: 6,
  },
  locationRemove: {
    fontSize: 12,
    color: "#6E6A82",
    fontWeight: "bold",
  },

  iconsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 14,
    gap: 14,
  },
  actionIconBtn: {
    padding: 4,
  },
  actionIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },

  imageLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1B172B",
    textAlign: "center",
    marginBottom: 10,
  },
  imagePreviewContainer: {
    width: 170,
    height: 170,
    maxWidth: "100%",
    borderRadius: 14,
    backgroundColor: "#000000",
    alignSelf: "center",
    marginBottom: 18,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 170,
    height: 170,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  removeImageBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  removeImageText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyPreviewContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  emptyPreviewText: {
    color: "#FFFFFF",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "500",
    paddingHorizontal: 12,
  },

  sendButton: {
    backgroundColor: "#110D20",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default CriaPost;