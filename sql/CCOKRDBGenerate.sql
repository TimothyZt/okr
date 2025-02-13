USE [CCOKRMSUAT]
GO
/****** Object:  Table [dbo].[OKR_KeyResult]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OKR_KeyResult](
	[ID] [uniqueidentifier] NOT NULL,
	[BelongOId] [uniqueidentifier] NULL,
	[Desc] [nvarchar](500) NULL,
	[Progress] [decimal](8, 4) NULL,
	[Weight] [decimal](8, 4) NULL,
	[Remark] [nvarchar](500) NULL,
	[SelfScoreId] [uniqueidentifier] NULL,
	[SupervisorScoreId] [uniqueidentifier] NULL,
	[AuditBy] [uniqueidentifier] NULL,
	[AuditByN] [nvarchar](50) NULL,
	[AuditTime] [datetime] NULL,
	[AuditLevel] [int] NULL,
	[AuditRemarks] [nvarchar](500) NULL,
	[StatusCode] [nvarchar](50) NULL,
	[IsDeleted] [int] NULL,
	[CreateBy] [uniqueidentifier] NULL,
	[CreateOn] [datetime] NULL,
	[UpdatedBy] [uniqueidentifier] NULL,
	[UpdatedOn] [datetime] NULL,
	[SubmittedBy] [uniqueidentifier] NULL,
	[SubmittedOn] [datetime] NULL,
	[DeletedBy] [uniqueidentifier] NULL,
	[DeletedOn] [datetime] NULL,
	[Lvl01AuditBy] [uniqueidentifier] NULL,
	[Lvl01AuditByN] [nvarchar](50) NULL,
	[Lvl01AuditTime] [datetime] NULL,
	[Lvl02AuditBy] [uniqueidentifier] NULL,
	[Lvl02AuditByN] [nvarchar](50) NULL,
	[Lvl02AuditTime] [datetime] NULL,
	[Lvl03AuditBy] [uniqueidentifier] NULL,
	[Lvl03AuditByN] [nvarchar](50) NULL,
	[Lvl03AuditTime] [datetime] NULL,
	[Lvl04AuditBy] [uniqueidentifier] NULL,
	[Lvl04AuditByN] [nvarchar](50) NULL,
	[Lvl04AuditTime] [datetime] NULL,
	[Lvl05AuditBy] [uniqueidentifier] NULL,
	[Lvl05AuditByN] [nvarchar](50) NULL,
	[Lvl05AuditTime] [datetime] NULL,
	[Lvl06AuditBy] [uniqueidentifier] NULL,
	[Lvl06AuditByN] [nvarchar](50) NULL,
	[Lvl06AuditTime] [datetime] NULL,
	[Lvl07AuditBy] [uniqueidentifier] NULL,
	[Lvl07AuditByN] [nvarchar](50) NULL,
	[Lvl07AuditTime] [datetime] NULL,
	[Lvl08AuditBy] [uniqueidentifier] NULL,
	[Lvl08AuditByN] [nvarchar](50) NULL,
	[Lvl08AuditTime] [datetime] NULL,
	[Lvl09AuditBy] [uniqueidentifier] NULL,
	[Lvl09AuditByN] [nvarchar](50) NULL,
	[Lvl09AuditTime] [datetime] NULL,
	[Lvl10AuditBy] [uniqueidentifier] NULL,
	[Lvl10AuditByN] [nvarchar](50) NULL,
	[Lvl10AuditTime] [datetime] NULL,
	[FinalAuditBy] [uniqueidentifier] NULL,
	[FinalAuditByN] [nvarchar](50) NULL,
	[FinalAuditTime] [datetime] NULL,
	[FinalAuditRemarks] [nvarchar](500) NULL,
	[Lvl01AuditRemarks] [nvarchar](500) NULL,
	[Lvl02AuditRemarks] [nvarchar](500) NULL,
	[Lvl03AuditRemarks] [nvarchar](500) NULL,
	[Lvl04AuditRemarks] [nvarchar](500) NULL,
	[Lvl05AuditRemarks] [nvarchar](500) NULL,
	[Lvl06AuditRemarks] [nvarchar](500) NULL,
	[Lvl07AuditRemarks] [nvarchar](500) NULL,
	[Lvl08AuditRemarks] [nvarchar](500) NULL,
	[Lvl09AuditRemarks] [nvarchar](500) NULL,
	[Lvl10AuditRemarks] [nvarchar](500) NULL,
	[TEXT00] [nvarchar](500) NULL,
	[TEXT01] [nvarchar](500) NULL,
	[TEXT02] [nvarchar](500) NULL,
	[TEXT03] [nvarchar](500) NULL,
	[DATE00] [datetime] NULL,
	[DATE01] [datetime] NULL,
	[DATE02] [datetime] NULL,
	[DATE03] [datetime] NULL,
 CONSTRAINT [PK_OKR_KeyResult] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OKR_Objective]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OKR_Objective](
	[ID] [uniqueidentifier] NOT NULL,
	[BelongToEmplId] [uniqueidentifier] NULL,
	[BelongToEmplN] [nvarchar](50) NULL,
	[OKRPeriodId] [uniqueidentifier] NULL,
	[ObjType] [uniqueidentifier] NULL,
	[Strategic_O_Id] [uniqueidentifier] NULL,
	[Desc] [nvarchar](500) NULL,
	[Progress] [decimal](8, 4) NULL,
	[Weight] [decimal](8, 4) NULL,
	[Remark] [nvarchar](500) NULL,
	[AlignType] [varchar](2) NULL,
	[AlignId] [uniqueidentifier] NULL,
	[SelfScoreId] [uniqueidentifier] NULL,
	[SupervisorScoreId] [uniqueidentifier] NULL,
	[AuditBy] [uniqueidentifier] NULL,
	[AuditByN] [nvarchar](50) NULL,
	[AuditTime] [datetime] NULL,
	[AuditLevel] [int] NULL,
	[AuditRemarks] [nvarchar](500) NULL,
	[StatusCode] [nvarchar](50) NULL,
	[IsDeleted] [int] NULL,
	[CreateBy] [uniqueidentifier] NULL,
	[CreateOn] [datetime] NULL,
	[UpdatedBy] [uniqueidentifier] NULL,
	[UpdatedOn] [datetime] NULL,
	[SubmittedBy] [uniqueidentifier] NULL,
	[SubmittedOn] [datetime] NULL,
	[DeletedBy] [uniqueidentifier] NULL,
	[DeletedOn] [datetime] NULL,
	[Lvl01AuditBy] [uniqueidentifier] NULL,
	[Lvl01AuditByN] [nvarchar](50) NULL,
	[Lvl01AuditTime] [datetime] NULL,
	[Lvl02AuditBy] [uniqueidentifier] NULL,
	[Lvl02AuditByN] [nvarchar](50) NULL,
	[Lvl02AuditTime] [datetime] NULL,
	[Lvl03AuditBy] [uniqueidentifier] NULL,
	[Lvl03AuditByN] [nvarchar](50) NULL,
	[Lvl03AuditTime] [datetime] NULL,
	[Lvl04AuditBy] [uniqueidentifier] NULL,
	[Lvl04AuditByN] [nvarchar](50) NULL,
	[Lvl04AuditTime] [datetime] NULL,
	[Lvl05AuditBy] [uniqueidentifier] NULL,
	[Lvl05AuditByN] [nvarchar](50) NULL,
	[Lvl05AuditTime] [datetime] NULL,
	[Lvl06AuditBy] [uniqueidentifier] NULL,
	[Lvl06AuditByN] [nvarchar](50) NULL,
	[Lvl06AuditTime] [datetime] NULL,
	[Lvl07AuditBy] [uniqueidentifier] NULL,
	[Lvl07AuditByN] [nvarchar](50) NULL,
	[Lvl07AuditTime] [datetime] NULL,
	[Lvl08AuditBy] [uniqueidentifier] NULL,
	[Lvl08AuditByN] [nvarchar](50) NULL,
	[Lvl08AuditTime] [datetime] NULL,
	[Lvl09AuditBy] [uniqueidentifier] NULL,
	[Lvl09AuditByN] [nvarchar](50) NULL,
	[Lvl09AuditTime] [datetime] NULL,
	[Lvl10AuditBy] [uniqueidentifier] NULL,
	[Lvl10AuditByN] [nvarchar](50) NULL,
	[Lvl10AuditTime] [datetime] NULL,
	[FinalAuditBy] [uniqueidentifier] NULL,
	[FinalAuditByN] [nvarchar](50) NULL,
	[FinalAuditTime] [datetime] NULL,
	[FinalAuditRemarks] [nvarchar](500) NULL,
	[Lvl01AuditRemarks] [nvarchar](500) NULL,
	[Lvl02AuditRemarks] [nvarchar](500) NULL,
	[Lvl03AuditRemarks] [nvarchar](500) NULL,
	[Lvl04AuditRemarks] [nvarchar](500) NULL,
	[Lvl05AuditRemarks] [nvarchar](500) NULL,
	[Lvl06AuditRemarks] [nvarchar](500) NULL,
	[Lvl07AuditRemarks] [nvarchar](500) NULL,
	[Lvl08AuditRemarks] [nvarchar](500) NULL,
	[Lvl09AuditRemarks] [nvarchar](500) NULL,
	[Lvl10AuditRemarks] [nvarchar](500) NULL,
	[TEXT00] [nvarchar](500) NULL,
	[TEXT01] [nvarchar](500) NULL,
	[TEXT02] [nvarchar](500) NULL,
	[TEXT03] [nvarchar](500) NULL,
	[DATE00] [datetime] NULL,
	[DATE01] [datetime] NULL,
	[DATE02] [datetime] NULL,
	[DATE03] [datetime] NULL,
 CONSTRAINT [PK_OKR_Objective] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OKRBaseInfo]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OKRBaseInfo](
	[Id] [uniqueidentifier] NOT NULL,
	[GroupCode] [nvarchar](50) NULL,
	[GroupName] [nvarchar](50) NULL,
	[Code] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NULL,
	[Name_1] [nvarchar](50) NULL,
	[Name_2] [nvarchar](50) NULL,
	[Remark] [nvarchar](50) NULL,
	[sColumn1] [nvarchar](50) NULL,
	[sColumn2] [nvarchar](50) NULL,
	[iColumn1] [int] NULL,
	[iColumn2] [int] NULL,
	[CompanyCode] [varchar](20) NULL,
	[IsDeleted] [bit] NULL,
	[CreateBy] [uniqueidentifier] NULL,
	[CreateOn] [datetime] NULL,
	[LastupdBy] [uniqueidentifier] NULL,
	[LastupdOn] [datetime] NULL,
	[DeleteBy] [uniqueidentifier] NULL,
	[DeleteOn] [datetime] NULL,
	[RowVersion] [timestamp] NULL,
 CONSTRAINT [PK_OKRBaseInfo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OKRDepartment]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OKRDepartment](
	[Id] [uniqueidentifier] NOT NULL,
	[Level] [int] NOT NULL,
	[ParentId] [uniqueidentifier] NULL,
	[ParentCode] [varchar](20) NULL,
	[SelfCode] [varchar](20) NOT NULL,
	[Code] [varchar](20) NOT NULL,
	[FullCode] [varchar](1000) NULL,
	[CompanyCode] [varchar](10) NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Name_1] [nvarchar](50) NULL,
	[Name_2] [nvarchar](50) NULL,
	[FullName] [nvarchar](500) NULL,
	[ClassList] [nvarchar](50) NULL,
	[ClassName] [nvarchar](50) NULL,
	[IsUseDeptClass] [bit] NULL,
	[Remark] [nvarchar](50) NULL,
	[IsDelete] [bit] NOT NULL,
	[CreateBy] [uniqueidentifier] NULL,
	[CreateOn] [datetime] NULL,
	[LastupdBy] [uniqueidentifier] NULL,
	[LastupdOn] [datetime] NULL,
	[DeleteBy] [uniqueidentifier] NULL,
	[DeleteOn] [datetime] NULL,
	[IsHide] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OKRGroup]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OKRGroup](
	[GroupID] [uniqueidentifier] NOT NULL,
	[CompanyId] [uniqueidentifier] NOT NULL,
	[CompanyName] [nvarchar](50) NULL,
	[SecretaryId] [uniqueidentifier] NULL,
	[SecretaryName] [nvarchar](50) NULL,
	[MarkerSecId] [uniqueidentifier] NULL,
	[MarkerSecName] [nvarchar](50) NULL,
	[MarkerId] [uniqueidentifier] NULL,
	[MarkerName] [nvarchar](50) NULL,
	[OKRYear] [int] NULL,
	[OKRPeriodId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_OKRGroup] PRIMARY KEY CLUSTERED 
(
	[GroupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OKROrgChart]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OKROrgChart](
	[ID] [uniqueidentifier] NOT NULL,
	[OKRYear] [int] NULL,
	[OKRPeriod] [uniqueidentifier] NULL,
	[EmplId] [uniqueidentifier] NOT NULL,
	[EmplNum] [nvarchar](20) NULL,
	[CompanyId] [uniqueidentifier] NULL,
	[CompanyName] [nvarchar](100) NULL,
	[Sex] [nvarchar](100) NULL,
	[EmplName] [nvarchar](100) NULL,
	[EmplLevel] [int] NULL,
	[DeptCode] [nvarchar](100) NULL,
	[DeptId] [uniqueidentifier] NULL,
	[DepartmentName] [nvarchar](100) NULL,
	[DepartmentFullName] [nvarchar](100) NULL,
	[Position] [nvarchar](100) NULL,
	[Rank] [nvarchar](100) NULL,
	[EmailAdress] [nvarchar](100) NULL,
	[employeeRankId] [bigint] NULL,
	[isDelete] [bit] NOT NULL,
	[CreateBy] [uniqueidentifier] NULL,
	[CreateOn] [datetime] NULL,
	[LastupdBy] [uniqueidentifier] NULL,
	[LastupdOn] [datetime] NULL,
	[DeleteBy] [uniqueidentifier] NULL,
	[DeleteOn] [datetime] NULL,
	[rowNum] [int] NULL,
	[Password] [nvarchar](8) NULL,
 CONSTRAINT [PK_OKROrgChart] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OKRPeriodSetting]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OKRPeriodSetting](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[OKRYear] [int] NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[SysCode] [nvarchar](200) NULL,
	[SysCodeValue] [nvarchar](200) NULL,
	[isActive] [bit] NOT NULL,
	[OKRPeriodType] [uniqueidentifier] NULL,
 CONSTRAINT [PK_KpiSetting] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SysMenu]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysMenu](
	[Id] [uniqueidentifier] NOT NULL,
	[ParentId] [uniqueidentifier] NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Name1] [nvarchar](50) NULL,
	[Name2] [nvarchar](50) NULL,
	[Link] [nvarchar](200) NULL,
	[Order] [int] NULL,
	[Level] [int] NULL,
	[Module] [nvarchar](50) NULL,
	[Glyph] [nvarchar](50) NULL,
	[KeyGesture] [nvarchar](50) NULL,
	[Visiable] [bit] NULL,
	[IsWorkFlow] [varchar](50) NULL,
 CONSTRAINT [PK_SysMenu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SysRole]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysRole](
	[CompanyId] [uniqueidentifier] NULL,
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NULL,
	[DESC_1] [nvarchar](50) NULL,
	[DESC_2] [nvarchar](50) NULL,
	[DESC_3] [nvarchar](50) NULL,
	[IsDeleted] [bit] NULL,
	[CreateBy] [uniqueidentifier] NULL,
	[CreateOn] [datetime] NULL,
	[LastupdBy] [uniqueidentifier] NULL,
	[LastupdOn] [datetime] NULL,
	[DeleteBy] [uniqueidentifier] NULL,
	[DeleteOn] [datetime] NULL,
	[RowVersion] [timestamp] NULL,
 CONSTRAINT [PK_SysRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SysRoleMenu]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysRoleMenu](
	[AutoId] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [uniqueidentifier] NOT NULL,
	[MenuId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_SysRolePermission_1] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC,
	[MenuId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sysuser]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sysuser](
	[Id] [uniqueidentifier] NOT NULL,
	[CompanyId] [uniqueidentifier] NOT NULL,
	[LoginId] [varchar](20) NULL,
	[Password] [varbinary](255) NOT NULL,
	[EmplId] [uniqueidentifier] NOT NULL,
	[EmplName] [nvarchar](20) NULL,
	[PasswordExpDate] [datetime] NULL,
	[LastLoginOn] [datetime] NULL,
	[LastAppVersionMajor] [smallint] NULL,
	[LastAppVersionMinor] [smallint] NULL,
	[LastAppVersionBuild] [smallint] NULL,
	[LastAppVersionRevision] [smallint] NULL,
	[LastVersion] [varchar](20) NULL,
	[LastLanguage] [varchar](20) NULL,
	[Email] [nvarchar](100) NULL,
	[Tel1] [nvarchar](20) NULL,
	[Tel2] [nvarchar](20) NULL,
	[IsSuspend] [bit] NOT NULL,
	[Remark] [nvarchar](50) NULL,
	[CreatedBy] [uniqueidentifier] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[LastUpdBy] [uniqueidentifier] NULL,
	[LastUpdOn] [datetime] NULL,
	[DeletedBy] [uniqueidentifier] NULL,
	[DeletedOn] [datetime] NULL,
	[RowVersion] [timestamp] NOT NULL,
	[IsPrintFromLocal] [bit] NULL,
	[UserCode] [varchar](20) NULL,
	[quocompcode] [nvarchar](50) NULL,
	[PasswordErrCount] [int] NULL,
	[ErrCode] [varchar](20) NULL,
	[CreateByN] [nvarchar](20) NULL,
	[LastupdByN] [nvarchar](20) NULL,
	[DeleteByN] [nvarchar](20) NULL,
 CONSTRAINT [PK_sysuser] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SysUserRole]    Script Date: 23/5/2024 17:54:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysUserRole](
	[AutoId] [int] IDENTITY(1,1) NOT NULL,
	[AccountId] [uniqueidentifier] NOT NULL,
	[RoleId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_SysUserRole] PRIMARY KEY CLUSTERED 
(
	[AccountId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[OKR_KeyResult] ADD  CONSTRAINT [DF_OKR_KeyResult_IsDelete]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[OKR_Objective] ADD  CONSTRAINT [DF_OKR_Objective_IsDelete]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[OKRDepartment] ADD  CONSTRAINT [DF_OKRDepartment_IsHide]  DEFAULT ((0)) FOR [IsHide]
GO
ALTER TABLE [dbo].[OKROrgChart] ADD  CONSTRAINT [DF_OKROrgChart_isDelete]  DEFAULT ((0)) FOR [isDelete]
GO
ALTER TABLE [dbo].[OKROrgChart] ADD  CONSTRAINT [DF_OKROrgChart_CreateOn]  DEFAULT (getdate()) FOR [CreateOn]
GO
ALTER TABLE [dbo].[OKRPeriodSetting] ADD  CONSTRAINT [DF_OKRPeriodSetting_isEnabled]  DEFAULT ((0)) FOR [isActive]
GO
ALTER TABLE [dbo].[SysMenu] ADD  CONSTRAINT [DF_SysMenu_Visiable]  DEFAULT ((1)) FOR [Visiable]
GO
ALTER TABLE [dbo].[sysuser] ADD  CONSTRAINT [DF_sysuser_LastAppVersionMajor]  DEFAULT ((0)) FOR [LastAppVersionMajor]
GO
ALTER TABLE [dbo].[sysuser] ADD  CONSTRAINT [DF_sysuser_LastAppVersionMinor]  DEFAULT ((0)) FOR [LastAppVersionMinor]
GO
ALTER TABLE [dbo].[sysuser] ADD  CONSTRAINT [DF_sysuser_LastAppVersionBuild]  DEFAULT ((0)) FOR [LastAppVersionBuild]
GO
ALTER TABLE [dbo].[sysuser] ADD  CONSTRAINT [DF_sysuser_LastAppVersionRevision]  DEFAULT ((0)) FOR [LastAppVersionRevision]
GO
ALTER TABLE [dbo].[sysuser] ADD  CONSTRAINT [DF_sysuser_IsPrintFromLocal]  DEFAULT ((0)) FOR [IsPrintFromLocal]
GO
ALTER TABLE [dbo].[sysuser] ADD  CONSTRAINT [DF_sysuser_quocomp_6AA3C924]  DEFAULT ('') FOR [quocompcode]
GO
ALTER TABLE [dbo].[sysuser] ADD  CONSTRAINT [DF_sysuser_PasswordErrCount]  DEFAULT ((0)) FOR [PasswordErrCount]
GO
