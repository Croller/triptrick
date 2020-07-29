CREATE TABLE [users] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [organization_id] int DEFAULT NULL,
  [department_id] int DEFAULT NULL,
  [position_id] int DEFAULT NULL,
  [login] nvarchar(255) DEFAULT NULL,
  [password] nvarchar(255) DEFAULT NULL,
  [surname] nvarchar(255) DEFAULT NULL,
  [name] nvarchar(255) DEFAULT NULL,
  [middlename] nvarchar(255) DEFAULT NULL,
  [birth] datetime DEFAULT NULL,
  [office_phone] nvarchar(255) DEFAULT NULL,
  [mobile_phone] nvarchar(255) DEFAULT NULL,
  [work_email] nvarchar(255) DEFAULT NULL,
  [optional_email] nvarchar(255) DEFAULT NULL,
  [roles_id] nvarchar(255) DEFAULT NULL,
  [last_login] datetime DEFAULT NULL,
  [avatar] BIT DEFAULT 0,
)
GO

CREATE TABLE [alias_col_users] (
  [key] nvarchar(255),
  [name] nvarchar(255)
)
GO

CREATE TABLE [organization] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(255) DEFAULT NULL,
  [description] nvarchar(255) DEFAULT NULL,
  [phone] nvarchar(255) DEFAULT NULL,
  [ph_address] nvarchar(255) DEFAULT NULL,
  [ur_address] nvarchar(255) DEFAULT NULL,
  [inn] int DEFAULT NULL,
  [email] nvarchar(255) DEFAULT NULL,
)
GO

CREATE TABLE [department] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [code] nvarchar(255) DEFAULT NULL,
  [name] nvarchar(255) DEFAULT NULL
)
GO

CREATE TABLE [position] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(255) DEFAULT NULL,
)
GO

CREATE TABLE [roles] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(255) DEFAULT NULL,
  [description] nvarchar(255) DEFAULT NULL
)
GO

CREATE TABLE [cost_structure] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [subcode] int DEFAULT NULL,
  [code] int,
  [plan] float DEFAULT NULL,
  [current] float DEFAULT NULL,
  [current_percent] float DEFAULT NULL,
  [forecast] float DEFAULT NULL,
  [forecast_percent] float DEFAULT NULL,
  [year] int,
  [quarter] int,
  [month] int,
  [upload] date
)
GO

CREATE TABLE [alias_col_cost_structure] (
  [key] nvarchar(255),
  [name] nvarchar(255)
)
GO

CREATE TABLE [dictionary_code_cost_structure] (
  [id] int,
  [subcode] int DEFAULT NULL,
  [name] nvarchar(255)
)
GO

CREATE TABLE [composition_work] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [code] bigint,
  [name] nvarchar(255) ,
  [volume] int DEFAULT NULL,
  [volume_half_year] int DEFAULT NULL,
  [cost] float DEFAULT NULL,
  [cost_half_year] float DEFAULT NULL,
  [forecast] float DEFAULT NULL,
  [year] int,
  [quarter] int,
  [month] int,
  [upload] date
)
GO

CREATE TABLE [alias_col_composition_work] (
  [key] nvarchar(255),
  [name] nvarchar(255)
)
GO

CREATE TABLE [monitoring_KURT] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [country] nvarchar(255),
  [recorder_GZ] nvarchar(255) DEFAULT NULL,
  [name] nvarchar(255),
  [area_IK] float DEFAULT NULL,
  [area_KURT] float DEFAULT NULL,
  [area_PZZ] float DEFAULT NULL,
  [area_GNC] float DEFAULT NULL,
  [area_residential] float DEFAULT NULL,
  [area_renovation] float DEFAULT NULL,
  [area_social_obj] float DEFAULT NULL,
  [area_hotel] float DEFAULT NULL,
  [area_industrial] float DEFAULT NULL,
  [area_OD] float DEFAULT NULL,
  [balance_housing] float DEFAULT NULL,
  [balance_social_obj] float DEFAULT NULL,
  [balance_industrial] float DEFAULT NULL,
  [growth_job] int DEFAULT NULL,
  [growth_population] int DEFAULT NULL,
  [size_investments] float DEFAULT NULL,
  [project_status] nvarchar(255) DEFAULT NULL,
  [considered_DIiPP_first] nvarchar(255) DEFAULT NULL,
  [considered_DIiPP_second] nvarchar(255) DEFAULT NULL,
  [considered_DIiPP_third] nvarchar(255) DEFAULT NULL,
  [GIN_request_send] nvarchar(255) DEFAULT NULL,
  [GIN_answer_received] nvarchar(255) DEFAULT NULL,
  [MKA_request_send] nvarchar(255) DEFAULT NULL,
  [MKA_answer_received] nvarchar(255) DEFAULT NULL,
  [DGI_request_send] nvarchar(255) DEFAULT NULL,
  [DGI_answer_received] nvarchar(255) DEFAULT NULL,
  [Prefecture_request_send] nvarchar(255) DEFAULT NULL,
  [Prefecture_answer_received] nvarchar(255) DEFAULT NULL,
  [GZK_request_send] nvarchar(255) DEFAULT NULL,
  [GZK_answer_received] nvarchar(255) DEFAULT NULL,
  [date_GZK_PZZ] nvarchar(255) DEFAULT NULL,
  [date_Prefecture] nvarchar(255) DEFAULT NULL,
  [date_public_hearing] nvarchar(255) DEFAULT NULL,
  [PPM_PZZ] nvarchar(255) DEFAULT NULL,
  [decision_KRT] nvarchar(255) DEFAULT NULL,
  [waiting_doc_holders] nvarchar(255) DEFAULT NULL,
  [auction_decision] nvarchar(255) DEFAULT NULL,
  [contract_conclusion] nvarchar(255) DEFAULT NULL,
  [approval_PPT] nvarchar(255) DEFAULT NULL,
  [sellingr_SPV] nvarchar(255) DEFAULT NULL,
  [year] int,
  [quarter] int,
  [month] int,
  [upload] date
)
GO

CREATE TABLE [alias_col_monitoring_KURT] (
  [key] nvarchar(255),
  [name] nvarchar(255)
)
GO

CREATE TABLE [network_diagram] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [county] nvarchar(255),
  [date_meeting] nvarchar(255) DEFAULT NULL,
  [indastrial] nvarchar(255) DEFAULT NULL,
  [area] float DEFAULT NULL,
  [consideration_DIIPP] int DEFAULT NULL,
  [done] int DEFAULT NULL,
  [jan] int DEFAULT NULL,
  [fed] int DEFAULT NULL,
  [mar] int DEFAULT NULL,
  [apr] int DEFAULT NULL,
  [may] int DEFAULT NULL,
  [jun] int DEFAULT NULL,
  [jul] int DEFAULT NULL,
  [aug] int DEFAULT NULL,
  [sep] int DEFAULT NULL,
  [oct] int DEFAULT NULL,
  [nov] int DEFAULT NULL,
  [dev] int DEFAULT NULL,
  [year] int,
  [quarter] int,
  [month] int,
  [upload] date
)
GO

CREATE TABLE [alias_col_network_diagram] (
  [key] nvarchar(255),
  [name] nvarchar(255)
)
GO

CREATE TABLE [dictionary_status_network_diagram] (
  [id] int,
  [name] nvarchar(255)
)
GO

CREATE TABLE [analitics_materials] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(255),
  [quarter_1] int DEFAULT NULL,
  [quarter_2] int DEFAULT NULL,
  [quarter_3] int DEFAULT NULL,
  [quarter_4] int DEFAULT NULL,
  [year] int,
  [quarter] int,
  [month] int,
  [upload] date
)
GO

CREATE TABLE [alias_col_analitics_materials] (
  [key] nvarchar(255),
  [name] nvarchar(255)
)
GO

CREATE TABLE [dictionary_status_analitics_materials] (
  [id] int,
  [name] nvarchar(255)
)
GO

CREATE TABLE [projects_localization] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(255),
  [project] nvarchar(255) DEFAULT NULL,
  [investment] float DEFAULT NULL,
  [workplaces] int DEFAULT NULL,
  [tz_params] nvarchar(255) DEFAULT NULL,
  [tz_land_area] float DEFAULT NULL,
  [tz_okc_area] float DEFAULT NULL,
  [industrial] nvarchar(255) DEFAULT NULL,
  [status_project] nvarchar(255) DEFAULT NULL,
  [comment] nvarchar(255) DEFAULT NULL,
  [source] nvarchar(255) DEFAULT NULL,
  [responsible] nvarchar(255) DEFAULT NULL,
  [status] int DEFAULT NULL,
  [year] int,
  [quarter] int,
  [month] int,
  [upload] date
)
GO

CREATE TABLE [alias_col_projects_localization] (
  [key] nvarchar(255),
  [name] nvarchar(255)
)
GO

CREATE TABLE [dictionary_status_projects_localization] (
  [id] int,
  [name] nvarchar(255)
)
GO

CREATE TABLE [reest_acts] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [cadastr_number] nvarchar(255) DEFAULT NULL,
  [address] nvarchar(255) DEFAULT NULL,
  [square] float DEFAULT NULL,
  [end_date] date DEFAULT NULL,
  [year] int,
  [quarter] int,
  [month] int,
  [upload] date
)
GO

CREATE TABLE [alias_col_reest_acts] (
  [key] nvarchar(255),
  [name] nvarchar(255)
)
GO

CREATE TABLE [fot] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [code] nvarchar(255) DEFAULT NULL,
  [plan] float DEFAULT NULL,
  [current] float DEFAULT NULL,
  [current_percent] float DEFAULT NULL,
  [roles] int,
  [year] int,
  [quarter] int,
  [month] int,
  [upload] date
)
GO

CREATE TABLE [alias_col_fot] (
  [key] nvarchar(255),
  [name] nvarchar(255)
)
GO

CREATE TABLE [dictionary_code_fot] (
  [id] nvarchar(255),
  [name] nvarchar(255)
)
GO

CREATE TABLE [dictionary_roles_fot] (
  [id] int,
  [name] nvarchar(255)
)
GO

