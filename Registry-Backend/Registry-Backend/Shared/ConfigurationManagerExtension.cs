namespace Registry_Backend.Shared
{
	public static class ConfigurationManagerExtension
	{
		public static IConfiguration AppSetting
		{
			get;
		}
		static ConfigurationManagerExtension()
		{
			AppSetting = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
		}
	}
}
