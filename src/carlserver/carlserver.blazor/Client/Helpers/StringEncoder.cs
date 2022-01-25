namespace carlserver.blazor.Client.Helpers
{
    public static class StringEncoder
    {
      public static string EncodeString(string toEncode)
        {
            if (!string.IsNullOrEmpty(toEncode))
            {
                return Uri.EscapeDataString(toEncode);
            }
            return "";
        }
    }
}
